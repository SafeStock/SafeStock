#!/bin/bash

# 🚀 Deploy Script SafeStock para AWS EC2
# Uso: bash deploy-aws.sh

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║       SafeStock Deploy em AWS EC2 - Docker Compose             ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logging
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; exit 1; }

# 1. Verificar se está na pasta correta
log_info "Verificando ambiente..."
if [ ! -f "docker-compose.yml" ]; then
    log_error "docker-compose.yml não encontrado. Execute este script da raiz do projeto."
fi
log_success "Projeto encontrado"

# 2. Obter IP Elástico
log_info "Obtendo IP Elástico da EC2..."
EIP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
if [ -z "$EIP" ]; then
    log_error "Não foi possível obter o IP Elástico. Certifique-se de estar em uma EC2 AWS."
fi
log_success "IP Elástico: $EIP"

# 3. Criar arquivo .env para AWS
log_info "Criando arquivo .env para produção..."
cat > .env << EOF
# SafeStock - Configuração AWS EC2
# Gerado automaticamente pelo deploy-aws.sh
# Data: $(date)

ENVIRONMENT=production
FRONTEND_URL=http://$EIP
BACKEND_URL=http://$EIP/api

SPRING_PROFILES_ACTIVE=prod

# Database
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_DATABASE=safestockDB
MYSQL_USER=safestock_app
MYSQL_PASSWORD=admin123
MYSQL_ROOT_PASSWORD=admin123

# Message Queue
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin123

# Cache
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_VALIDITY=3600000
EOF
log_success "Arquivo .env criado"

# 4. Instalar Docker (se necessário)
log_info "Verificando Docker..."
if ! command -v docker &> /dev/null; then
    log_warning "Docker não encontrado. Instalando..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    newgrp docker
    log_success "Docker instalado"
else
    DOCKER_VERSION=$(docker --version)
    log_success "Docker encontrado: $DOCKER_VERSION"
fi

# 5. Instalar Docker Compose (se necessário)
log_info "Verificando Docker Compose..."
if ! command -v docker compose &> /dev/null; then
    log_warning "Docker Compose não encontrado. Instalando..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    log_success "Docker Compose instalado"
else
    COMPOSE_VERSION=$(docker compose version)
    log_success "Docker Compose encontrado: $COMPOSE_VERSION"
fi

# 6. Parar containers antigos (se existirem)
log_info "Limpando containers antigos..."
docker compose down --remove-orphans 2>/dev/null || true
log_success "Limpeza concluída"

# 7. Deletar volumes antigos (dados antigos do BD)
read -p "Deseja deletar dados antigos do banco de dados? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    log_warning "Removendo volumes antigos..."
    docker compose down -v 2>/dev/null || true
    docker volume prune -f --filter "label!=keep" 2>/dev/null || true
    log_success "Volumes removidos"
else
    log_info "Mantendo dados existentes"
fi

# 8. Fazer build das imagens
log_info "Fazendo build das imagens Docker..."
docker compose build --no-cache

# 9. Iniciar containers
log_info "Iniciando containers..."
docker compose up -d

# 10. Aguardar health checks
log_info "Aguardando serviços ficarem prontos (até 2 minutos)..."
for i in {1..60}; do
    if docker compose ps | grep -q "healthy"; then
        log_success "Serviços prontos!"
        break
    fi
    echo -n "."
    sleep 2
done

# 11. Verificar status
log_info "Status dos containers:"
docker compose ps

# 12. Testar conectividade
log_info "Testando conectividade..."
sleep 5

if curl -s http://localhost/frontend-health > /dev/null 2>&1; then
    log_success "Frontend respondendo"
else
    log_warning "Frontend ainda iniciando..."
fi

if curl -s http://localhost/api/produtos/public/paged > /dev/null 2>&1; then
    log_success "Backend API respondendo"
else
    log_warning "Backend ainda iniciando..."
fi

# 13. Exibir logs
log_info "Primeiros logs (últimas 20 linhas):"
docker compose logs --tail=20

# 14. Instruções finais
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    ✓ DEPLOY CONCLUÍDO!                         ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║                                                                ║"
echo "║  🌐 Acesse a aplicação em: http://$EIP                    ║"
echo "║                                                                ║"
echo "║  📊 Comandos úteis:                                            ║"
echo "║    - Ver logs:     docker compose logs -f                      ║"
echo "║    - Status:       docker compose ps                           ║"
echo "║    - Parar:        docker compose down                         ║"
echo "║    - Remover:      docker compose down -v                      ║"
echo "║                                                                ║"
echo "║  🔧 Variáveis de ambiente em: .env                             ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

log_success "SafeStock está rodando em produção! 🎉"
