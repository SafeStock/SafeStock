#!/bin/bash
# USER DATA SCRIPT - BACKEND EC2 (Spring Boot)
# Logging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Backend EC2 User Data - SafeStock ===="
echo "Timestamp: $(date)"

# Variáveis do Terraform
REPOSITORY_URL="${repository_url}"
MYSQL_HOST="${mysql_host}"
MYSQL_PASSWORD="${mysql_password}"

# Atualizar sistema
echo "==== Atualizando sistema ===="
apt-get update -y
apt-get upgrade -y

# Instalar dependências
echo "==== Instalando dependências ===="
apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    default-jre \
    default-jdk \
    mysql-client

# Verificar Java
echo "==== Verificando instalação do Java ===="
java -version
javac -version

# Criar usuário para a aplicação
echo "==== Criando usuário safestock ===="
useradd -r -s /bin/false safestock
mkdir -p /opt/safestock
chown safestock:safestock /opt/safestock

# Clonar repositório
echo "==== Clonando repositório SafeStock ===="
cd /opt
git clone $REPOSITORY_URL safestock-repo
cd safestock-repo

# Copiar JAR da aplicação
echo "==== Configurando aplicação Spring Boot ===="
if [ -f "build-output/safestock-backend.jar" ]; then
    echo "Usando JAR pré-compilado"
    cp build-output/safestock-backend.jar /opt/safestock/safestock.jar
else
    echo "JAR não encontrado, compilando backend..."
    cd Back-end
    ./mvnw clean package -DskipTests
    cp target/safestock-*.jar /opt/safestock/safestock.jar
fi

# Definir permissões
chown -R safestock:safestock /opt/safestock

# Aguardar MySQL estar disponível
echo "==== Aguardando MySQL estar disponível ===="
until mysql -h $MYSQL_HOST -u safestock -p$MYSQL_PASSWORD -e "SELECT 1" &> /dev/null
do
    echo "Aguardando MySQL em $MYSQL_HOST..."
    sleep 5
done
echo "MySQL está disponível!"

# Criar arquivo de configuração de produção dinâmico
echo "==== Criando configuração de produção ===="
cat > /opt/safestock/application-prod.properties << EOF
# Configuração dinâmica para produção AWS
spring.datasource.url=jdbc:mysql://$MYSQL_HOST:3306/safestock?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=safestock
spring.datasource.password=$MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false
spring.jpa.defer-datasource-initialization=true

# Inicialização do banco
spring.sql.init.mode=always
spring.sql.init.data-locations=classpath:data.sql
spring.sql.init.continue-on-error=true
spring.sql.init.encoding=UTF-8

# Servidor
server.port=8080
server.error.include-message=always
server.error.include-binding-errors=always

# UTF-8
spring.datasource.hikari.connection-test-query=SELECT 1
spring.jpa.properties.hibernate.connection.CharSet=utf8
spring.jpa.properties.hibernate.connection.characterEncoding=utf8
spring.jpa.properties.hibernate.connection.useUnicode=true

# JWT
jwt.validity=3600000
jwt.secret=RXhpc3RlIHVtYSB0ZW9yaWEgcXVlIGRpeiBxdWUsIHNlIHVtIGRpYSBhbGd16W0gZGVzY29icmlyIGV4YXRhbWVudGUgcGFyYSBxdWUgc2VydmUgbyBVbml2ZXJzbyBlIHBvciBxdWUgZWxlIGVzdOEgYXF1aSwgZWxlIGRlc2FwYXJlY2Vy4SBpbnN0YW50YW5lYW1lbnRlIGUgc2Vy4SBzdWJzdGl0de1kbyBwb3IgYWxnbyBhaW5kYSBtYWlzIGVzdHJhbmhvIGUgaW5leHBsaWPhdmVsLiBFeGlzdGUgdW1hIHNlZ3VuZGEgdGVvcmlhIHF1ZSBkaXogcXVlIGlzc28gauEgYWNvbnRlY2V1Li4u

# Desabilitar H2
spring.h2.console.enabled=false

# Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.protocol=smtp
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000
EOF

# Criar script de inicialização
echo "==== Criando script de inicialização ===="
cat > /opt/safestock/start.sh << 'EOF'
#!/bin/bash
cd /opt/safestock
export SPRING_PROFILES_ACTIVE=prod
java -Xmx512m -Xms256m -jar safestock.jar --spring.config.additional-location=file:./application-prod.properties
EOF

chmod +x /opt/safestock/start.sh
chown safestock:safestock /opt/safestock/start.sh

# Criar serviço systemd
echo "==== Criando serviço systemd ===="
cat > /etc/systemd/system/safestock-backend.service << 'EOF'
[Unit]
Description=SafeStock Backend Service
After=network.target

[Service]
Type=simple
User=safestock
Group=safestock
WorkingDirectory=/opt/safestock
ExecStart=/opt/safestock/start.sh
Restart=always
RestartSec=10

# Logs
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=safestock-backend

# Limites
TimeoutStartSec=120
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
EOF

# Configurar firewall
echo "==== Configurando firewall ===="
ufw --force enable
ufw allow ssh
ufw allow 8080

# Habilitar e iniciar serviço
echo "==== Iniciando serviço SafeStock Backend ===="
systemctl daemon-reload
systemctl enable safestock-backend
systemctl start safestock-backend

# Aguardar serviço inicializar
echo "==== Aguardando serviço inicializar ===="
sleep 30

# Criar script de update
echo "==== Criando script de update ===="
cat > /opt/update-backend.sh << 'EOF'
#!/bin/bash
echo "Atualizando Backend SafeStock..."

# Parar serviço
systemctl stop safestock-backend

# Backup do JAR atual
cp /opt/safestock/safestock.jar /opt/safestock/safestock.jar.backup.$(date +%Y%m%d_%H%M%S)

# Atualizar repositório
cd /opt/safestock-repo
git pull origin main

# Copiar novo JAR
if [ -f "build-output/safestock-backend.jar" ]; then
    cp build-output/safestock-backend.jar /opt/safestock/safestock.jar
else
    cd Back-end
    ./mvnw clean package -DskipTests
    cp target/safestock-*.jar /opt/safestock/safestock.jar
fi

# Definir permissões
chown safestock:safestock /opt/safestock/safestock.jar

# Iniciar serviço
systemctl start safestock-backend
systemctl status safestock-backend

echo "Backend atualizado com sucesso!"
EOF

chmod +x /opt/update-backend.sh

# Status final
echo "==== Status do serviço ===="
systemctl status safestock-backend --no-pager

echo "==== Verificando health ===="
sleep 10
curl -f http://localhost:8080/actuator/health || echo "Health check falhou, verificar logs"

echo "==== Backend EC2 configurado com sucesso! ===="
echo "Para verificar logs: sudo journalctl -u safestock-backend -f"
echo "Para atualizar: sudo /opt/update-backend.sh"