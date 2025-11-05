#!/bin/bash
# BACKEND EC2 (Spring Boot)
# Logging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Backend EC2 User Data - SafeStock ===="
echo "Timestamp: $(date)"

# Variáveis do Terraform
REPOSITORY_URL="${repository_url}"
DATABASE_ENDPOINT="${database_endpoint}"
MYSQL_APP_PASSWORD="${mysql_app_password}"
INSTANCE_INDEX="${instance_index}"

# Validar variáveis obrigatórias
echo "==== Validando variáveis ===="
ERRORS=0

if [ -z "$REPOSITORY_URL" ]; then
    echo "✗ ERRO: REPOSITORY_URL não foi fornecida"
    ERRORS=$((ERRORS + 1))
else
    echo "✓ REPOSITORY_URL: $REPOSITORY_URL"
fi

if [ -z "$DATABASE_ENDPOINT" ]; then
    echo "✗ ERRO: DATABASE_ENDPOINT não foi fornecido"
    ERRORS=$((ERRORS + 1))
else
    echo "✓ DATABASE_ENDPOINT: $DATABASE_ENDPOINT"
fi

if [ -z "$MYSQL_APP_PASSWORD" ]; then
    echo "✗ ERRO: MYSQL_APP_PASSWORD não foi fornecida"
    ERRORS=$((ERRORS + 1))
else
    echo "✓ MYSQL_APP_PASSWORD: ***"
fi

if [ -z "$INSTANCE_INDEX" ]; then
    echo "⚠ WARNING: INSTANCE_INDEX não fornecido, usando 0"
    INSTANCE_INDEX=0
else
    echo "✓ INSTANCE_INDEX: $INSTANCE_INDEX"
fi

if [ $ERRORS -gt 0 ]; then
    echo "ERRO: $ERRORS variável(is) obrigatória(s) ausente(s)"
    exit 1
fi

echo "✓ Todas as variáveis validadas"

# Atualizar sistema
echo "==== Atualizando sistema ===="
yum update -y
yum upgrade -y  # Amazon Linux 2

# Instalar dependências
echo "==== Instalando dependências ===="
yum install -y \
    curl \
    wget \
    git \
    java-11-amazon-corretto-headless \
    mysql \
    unzip

# Verificar instalação do Java
java -version

# Configurar diretório da aplicação
echo "==== Configurando diretório da aplicação ===="
mkdir -p /opt/safestock
cd /opt/safestock

# Clonar repositório
echo "==== Clonando repositório ===="
git clone $REPOSITORY_URL temp-repo || {
    echo "✗ ERRO: Falha ao clonar repositório"
    exit 1
}

# Verificar e copiar arquivos do backend
echo "==== Verificando estrutura do repositório ===="
if [ -d "temp-repo/SafeStock/Back-end" ]; then
    echo "✓ Estrutura padrão encontrada"
    cp -r temp-repo/SafeStock/Back-end/* .
elif [ -d "temp-repo/Back-end" ]; then
    echo "✓ Estrutura alternativa encontrada"
    cp -r temp-repo/Back-end/* .
else
    echo "✗ ERRO: Estrutura do repositório não encontrada!"
    echo "Buscando diretório Back-end:"
    find temp-repo -type d -name "Back-end"
    exit 1
fi

rm -rf temp-repo
echo "✓ Repositório clonado e arquivos copiados"

# Aguardar MySQL estar disponível
echo "==== Aguardando MySQL em $DATABASE_ENDPOINT ===="
MAX_RETRIES=60
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if mysql -h "$DATABASE_ENDPOINT" -u safestock -p"$MYSQL_APP_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1; then
        echo "✓ MySQL disponível após $RETRY_COUNT tentativas"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Aguardando MySQL... tentativa $RETRY_COUNT de $MAX_RETRIES"
    sleep 10
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "ERRO: MySQL não ficou disponível após $MAX_RETRIES tentativas"
    exit 1
fi

# Configurar application.properties
echo "==== Configurando application.properties ===="
cat > src/main/resources/application.properties << EOF
# Database Configuration
spring.datasource.url=jdbc:mysql://$DATABASE_ENDPOINT:3306/safestock?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=safestock
spring.datasource.password=$MYSQL_APP_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# Server
server.port=8080
server.address=0.0.0.0

# Logging
logging.level.root=INFO
logging.level.com.example=DEBUG
logging.file.name=/var/log/safestock/application.log

# Application
spring.application.name=safestock-backend
instance.index=$INSTANCE_INDEX
EOF

# Criar diretório de logs
mkdir -p /var/log/safestock
chmod 755 /var/log/safestock

# Build da aplicação com Maven
echo "==== Fazendo build da aplicação ===="
if [ -f "mvnw" ]; then
    chmod +x mvnw
    ./mvnw clean package -DskipTests || {
        echo "Erro no build com Maven Wrapper"
        exit 1
    }
else
    echo "ERRO: Maven Wrapper não encontrado"
    exit 1
fi

# Verificar se o JAR foi gerado
JAR_FILE=$(find target -name "*.jar" ! -name "*-sources.jar" ! -name "*-javadoc.jar" ! -name "*original*" | head -n 1)

if [ -z "$JAR_FILE" ]; then
    echo "✗ ERRO: JAR não foi gerado"
    echo "Conteúdo do diretório target:"
    ls -lh target/ || echo "Diretório target não existe"
    exit 1
fi

echo "✓ JAR gerado: $JAR_FILE"

# Criar serviço systemd
echo "==== Configurando serviço systemd ===="
cat > /etc/systemd/system/safestock-backend.service << EOF
[Unit]
Description=SafeStock Backend Service (Instance $INSTANCE_INDEX)
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/safestock
ExecStart=/usr/bin/java -jar /opt/safestock/$JAR_FILE
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

# Java Options
Environment="JAVA_OPTS=-Xmx512m -Xms256m"

[Install]
WantedBy=multi-user.target
EOF

# Iniciar serviço
echo "==== Iniciando serviço ===="
systemctl daemon-reload
systemctl enable safestock-backend
systemctl start safestock-backend

# Aguardar aplicação iniciar
echo "==== Aguardando aplicação iniciar ===="
sleep 30

# Verificar status
echo "==== Status do serviço ===="
systemctl status safestock-backend --no-pager

# Testar endpoint
echo "==== Testando endpoint ===="
curl -f http://localhost:8080/health || echo "Warning: Health check falhou (pode ser que o endpoint não exista)"

# Criar script de update
echo "==== Criando script de update ===="
cat > /opt/update-backend.sh << 'EOF'
#!/bin/bash
cd /opt/safestock
git pull
if [ -f "mvnw" ]; then
    ./mvnw clean package -DskipTests
fi
systemctl restart safestock-backend
EOF

chmod +x /opt/update-backend.sh

# Informações finais
echo "==== Backend EC2 configurado com sucesso! ===="
echo "Instance Index: $INSTANCE_INDEX"
echo "Database: $DATABASE_ENDPOINT"
echo "Application Port: 8080"
echo "JAR: $JAR_FILE"
echo "Logs:"
echo "  - Application: /var/log/safestock/application.log"
echo "  - Service: journalctl -u safestock-backend -f"
echo "Script de update: /opt/update-backend.sh"