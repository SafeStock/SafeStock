#!/bin/bash
# Logging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Backend Containers EC2 User Data - SafeStock ===="
echo "Timestamp: $(date)"

# Variáveis do Terraform
REPOSITORY_URL="${repository_url}"
MYSQL_ROOT_PASSWORD="${mysql_root_password}"
MYSQL_APP_PASSWORD="${mysql_app_password}"

# Validar variáveis obrigatórias
echo "==== Validando variáveis ===="
ERRORS=0

if [ -z "$REPOSITORY_URL" ]; then
    echo "✗ ERRO: REPOSITORY_URL não foi fornecida"
    ERRORS=$((ERRORS + 1))
else
    echo "✓ REPOSITORY_URL: $REPOSITORY_URL"
fi

if [ -z "$MYSQL_ROOT_PASSWORD" ]; then
    echo "✗ ERRO: MYSQL_ROOT_PASSWORD não foi fornecida"
    ERRORS=$((ERRORS + 1))
else
    echo "✓ MYSQL_ROOT_PASSWORD: ***"
fi

if [ -z "$MYSQL_APP_PASSWORD" ]; then
    echo "✗ ERRO: MYSQL_APP_PASSWORD não foi fornecida"
    ERRORS=$((ERRORS + 1))
else
    echo "✓ MYSQL_APP_PASSWORD: ***"
fi

if [ $ERRORS -gt 0 ]; then
    echo "ERRO: $ERRORS variável(is) obrigatória(s) ausente(s)"
    exit 1
fi

echo "✓ Todas as variáveis validadas"

# Atualizar sistema
echo "==== Atualizando sistema ===="
yum update -y

# Instalar Docker
echo "==== Instalando Docker ===="
yum install -y docker git curl wget htop
amazon-linux-extras install -y docker

# Instalar Docker Compose v2 (plugin)
echo "==== Instalando Docker Compose v2 ===="
mkdir -p /usr/local/lib/docker/cli-plugins
curl -L "https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-linux-$(uname -m)" -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verificar instalação
docker compose version || {
    echo "✗ ERRO: Falha ao instalar Docker Compose"
    exit 1
}

# Iniciar Docker
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user


# Clonar repositório
echo "==== Clonando repositório ===="
cd /home/ec2-user
git clone $REPOSITORY_URL SafeStock || {
    echo "✗ ERRO: Falha ao clonar repositório"
    exit 1
}
chown -R ec2-user:ec2-user SafeStock

# Remover arquivos e pastas desnecessários para o backend
cd /home/ec2-user/SafeStock
echo "==== Limpando arquivos desnecessários para EC2 privada (backend) ===="
rm -rf Front-end docker-compose.frontend.yml Dockerfile.frontend Dockerfile.loadbalancer nginx.conf terraform docker-compose.yml docker-compose.aws.yml docker-compose.prod.yml Backend-Legado DataBase ARQUITETURA-AWS.md imagens URL-ACESSO.txt nginx-loadbalancer.conf README.md
rm -rf SafeStock/Front-end SafeStock/terraform
echo "Arquivos desnecessários removidos."

# Criar arquivo .env com configurações de teste/desenvolvimento
echo "==== Criando arquivo .env para ambiente de teste ===="
cat > .env << EOF
# Configurações para ambiente de TESTE/DESENVOLVIMENTO
# Para produção, altere estas variáveis manualmente

# MySQL - Senhas padrão para desenvolvimento
MYSQL_ROOT_PASSWORD=admin123
MYSQL_PASSWORD=admin123
MYSQL_DATABASE=safestockDB
MYSQL_USER=safestock_app

# RabbitMQ - Padrão para desenvolvimento
RABBITMQ_DEFAULT_USER=admin
RABBITMQ_DEFAULT_PASS=admin123

TZ=America/Sao_Paulo
ENVIRONMENT=development

# Redis
REDIS_HOST=sf-redis
REDIS_PORT=6379

# Spring Boot/Actuator
SPRING_PROFILES_ACTIVE=prod
MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=*
MANAGEMENT_ENDPOINT_HEALTH_ENABLED=true
EOF

echo "✓ Arquivo .env criado para ambiente de desenvolvimento"
echo "⚠️  ATENÇÃO: Usando senhas padrão (admin123) para ambiente de teste"



# Definir variáveis de ambiente para AWS
export AWS_EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "AWS_EC2_IP detectado: $AWS_EC2_IP"


echo "==== Iniciando apenas containers do BACKEND ===="
docker compose -f docker-compose.backend.yml --env-file .env up -d --pull always

# Aguardar containers do backend subirem
echo "==== Aguardando containers do backend iniciarem ===="
sleep 30

# Verificar status dos containers
echo "==== Status dos containers ===="
docker compose -f docker-compose.backend.yml --env-file .env ps

# Verificar logs dos containers
echo "==== Logs dos containers ===="
docker compose -f docker-compose.backend.yml --env-file .env logs --tail=50

# Testar endpoints
echo "==== Testando endpoints da API ===="
curl -f http://localhost:8081/health || echo "Backend 1 não respondeu"
curl -f http://localhost:8082/health || echo "Backend 2 não respondeu"

# Criar script de update
echo "==== Criando script de update ===="
git pull
docker compose -f docker-compose.backend.yml --env-file .env down
docker compose -f docker-compose.backend.yml --env-file .env up -d --build
cat > /home/ec2-user/update-containers.sh << 'EOF'
#!/bin/bash
cd /home/ec2-user/SafeStock
git pull
docker compose -f docker-compose.backend.yml --env-file .env down
docker compose -f docker-compose.backend.yml --env-file .env up -d --build
EOF

chmod +x /home/ec2-user/update-containers.sh
chown ec2-user:ec2-user /home/ec2-user/update-containers.sh

# Criar serviço systemd para auto-restart dos containers
echo "==== Configurando auto-restart dos containers ===="
sudo tee /etc/systemd/system/safestock-containers.service > /dev/null << 'EOF'
[Unit]
Description=SafeStock Containers
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=ec2-user
WorkingDirectory=/home/ec2-user/SafeStock
ExecStart=/usr/bin/docker compose -f docker-compose.backend.yml --env-file .env up -d
ExecStop=/usr/bin/docker compose -f docker-compose.backend.yml --env-file .env down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable safestock-containers

# Informações finais
echo "==== Backend Containers EC2 configurado com sucesso! ===="
echo "Containers rodando:"
echo "  - MySQL: porta 3306"
echo "  - RabbitMQ: porta 5672 (management: 15672)"
echo "  - Backend 1: porta 8081"
echo "  - Backend 2: porta 8082"
echo "Comandos úteis:"
echo "  - Ver containers: docker compose -f docker-compose.backend.yml --env-file .env ps"
echo "  - Ver logs: docker compose -f docker-compose.backend.yml --env-file .env logs -f"
echo "  - Restart: docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo restart"
echo "  - Update: /home/ec2-user/update-containers.sh"