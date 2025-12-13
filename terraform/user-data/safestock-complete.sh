#!/bin/bash
set -e

# ================================================================
# SafeStock - User Data Script
# Instala Docker, Docker Compose e inicia toda a aplicação
# ================================================================

echo "[$(date)] === INICIANDO SETUP DO SAFESTOCK ===" 

# ================================================================
# 1. UPDATE E DEPENDÊNCIAS BÁSICAS
# ================================================================
echo "[$(date)] Atualizando sistema..."
yum update -y
yum install -y git curl wget nano

# ================================================================
# 2. INSTALAR DOCKER
# ================================================================
echo "[$(date)] Instalando Docker..."
yum install -y docker
systemctl start docker
systemctl enable docker

# Dar permissão ao usuário ec2-user para usar Docker
usermod -aG docker ec2-user

# ================================================================
# 3. INSTALAR DOCKER COMPOSE
# ================================================================
echo "[$(date)] Instalando Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verificar instalações
echo "[$(date)] Docker version: $(docker --version)"
echo "[$(date)] Docker Compose version: $(/usr/local/bin/docker-compose --version)"

# ================================================================
# 4. CLONAR REPOSITÓRIO
# ================================================================
echo "[$(date)] Clonando repositório SafeStock..."
cd /home/ec2-user
git clone --depth 1 -b ${repository_branch} ${repository_url} safestock
cd safestock

# ================================================================
# 5. CRIAR ARQUIVO .env PARA PRODUÇÃO
# ================================================================
echo "[$(date)] Criando arquivo .env..."
cat > .env << EOF
# ================================================================
# SafeStock - Configuração AWS Production
# ================================================================

# ========== DATABASE ==========
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_DATABASE=safestock_db
MYSQL_USER=${mysql_user}
MYSQL_PASSWORD=${mysql_password}
MYSQL_ROOT_PASSWORD=${mysql_root_password}

# ========== RABBITMQ ==========
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_MANAGEMENT_PORT=15672
RABBITMQ_USER=${rabbitmq_user}
RABBITMQ_PASSWORD=${rabbitmq_password}
RABBITMQ_DEFAULT_USER=${rabbitmq_user}
RABBITMQ_DEFAULT_PASS=${rabbitmq_password}

# ========== REDIS ==========
REDIS_HOST=redis
REDIS_PORT=6379

# ========== SPRING BOOT ==========
SPRING_PROFILES_ACTIVE=${environment}
JAVA_OPTS=-Xmx1024m -Xms512m

# ========== FRONTEND ==========
FRONTEND_URL=http://\$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
VITE_API_URL=http://\$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8081

# ========== AMBIENTE ==========
ENVIRONMENT=${environment}
EOF

# Garantir que o arquivo tem permissões corretas
chmod 600 .env
chown ec2-user:ec2-user .env

echo "[$(date)] Arquivo .env criado com sucesso"

# ================================================================
# 6. CRIAR DIRETÓRIOS PARA VOLUMES
# ================================================================
echo "[$(date)] Criando diretórios para volumes..."
mkdir -p /safestock-data/mysql
mkdir -p /safestock-data/rabbitmq
mkdir -p /safestock-data/redis
mkdir -p /safestock-data/logs

# Dar permissões
chmod 755 /safestock-data
chmod 755 /safestock-data/*

# ================================================================
# 7. INICIAR CONTAINERS COM DOCKER COMPOSE
# ================================================================
echo "[$(date)] Iniciando containers..."
cd /home/ec2-user/safestock

# Se houver docker-compose.prod.yml, usar ele; senão usar o padrão
if [ -f "docker-compose.prod.yml" ]; then
    echo "[$(date)] Usando docker-compose.prod.yml para produção"
    /usr/local/bin/docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
else
    echo "[$(date)] Usando docker-compose.yml padrão"
    /usr/local/bin/docker-compose up -d
fi

echo "[$(date)] Containers iniciados"

# ================================================================
# 8. AGUARDAR HEALTH CHECKS
# ================================================================
echo "[$(date)] Aguardando containers ficarem saudáveis..."
sleep 30

echo "[$(date)] Status dos containers:"
/usr/local/bin/docker-compose ps

# ================================================================
# 9. LOGS DE SUCESSO
# ================================================================
echo "[$(date)] === SETUP CONCLUÍDO COM SUCESSO ===" 
echo "[$(date)] Aplicação SafeStock iniciada"
echo "[$(date)] Acesse em: http://\$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
