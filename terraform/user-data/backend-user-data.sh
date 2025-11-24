#!/bin/bash
# BACKEND EC2 COM CONTAINERS (2x Spring Boot + MySQL + RabbitMQ)
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
git clone $REPOSITORY_URL || {
    echo "✗ ERRO: Falha ao clonar repositório"
    exit 1
}
chown -R ec2-user:ec2-user SafeStock

# Navegar para o diretório do projeto
cd /home/ec2-user/SafeStock

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

# Configurações gerais
TZ=America/Sao_Paulo
ENVIRONMENT=development
EOF

echo "✓ Arquivo .env criado para ambiente de desenvolvimento"
echo "⚠️  ATENÇÃO: Usando senhas padrão (admin123) para ambiente de teste"

# Criar docker-compose override para corrigir profiles
echo "==== Criando override para profiles ===="
cat > docker-compose.override.yml << 'EOF'
services:
  mysql:
    profiles: ["antigo", "novo"]
  rabbitmq:
    profiles: ["antigo", "novo"]
EOF

# Definir variáveis de ambiente para AWS
export AWS_EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "AWS_EC2_IP detectado: $AWS_EC2_IP"

# Iniciar todos os containers usando o profile antigo com configurações AWS
echo "==== Iniciando containers com variáveis do Terraform ===="
docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo up -d --build

# Aguardar containers subirem
echo "==== Aguardando containers iniciarem ===="
sleep 60

# Verificar status dos containers
echo "==== Status dos containers ===="
docker compose -f docker-compose.yml -f docker-compose.aws.yml ps

# Verificar logs dos containers
echo "==== Logs dos containers ===="
docker compose -f docker-compose.yml -f docker-compose.aws.yml logs --tail=50

# Testar endpoints
echo "==== Testando endpoints da API ===="
curl -f http://localhost:8081/health || echo "Backend 1 não respondeu"
curl -f http://localhost:8082/health || echo "Backend 2 não respondeu"

# Criar script de update
echo "==== Criando script de update ===="
cat > /home/ec2-user/update-containers.sh << 'EOF'
#!/bin/bash
cd /home/ec2-user/SafeStock
git pull
export AWS_EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo down
docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo up -d --build
EOF

chmod +x /home/ec2-user/update-containers.sh
chown ec2-user:ec2-user /home/ec2-user/update-containers.sh

# Criar serviço systemd para auto-restart dos containers
echo "==== Configurando auto-restart dos containers ===="
cat > /etc/systemd/system/safestock-containers.service << 'EOF'
[Unit]
Description=SafeStock Containers
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=ec2-user
WorkingDirectory=/home/ec2-user/SafeStock
Environment="AWS_EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
ExecStart=/usr/bin/docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo up -d
ExecStop=/usr/bin/docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable safestock-containers

# Informações finais
echo "==== Backend Containers EC2 configurado com sucesso! ===="
echo "Containers rodando:"
echo "  - MySQL: porta 3306"
echo "  - RabbitMQ: porta 5672 (management: 15672)"
echo "  - Backend 1: porta 8081"
echo "  - Backend 2: porta 8082"
echo "Comandos úteis:"
echo "  - Ver containers: docker compose -f docker-compose.yml -f docker-compose.aws.yml ps"
echo "  - Ver logs: docker compose -f docker-compose.yml -f docker-compose.aws.yml logs -f"
echo "  - Restart: docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo restart"
echo "  - Update: /home/ec2-user/update-containers.sh"