#!/bin/bash
# Script para configurar variáveis de ambiente para AWS
set -e

echo "========================================"
echo "SafeStock - Configuração de Ambiente AWS"
echo "========================================"

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Verificar se terraform foi inicializado
if [ ! -f ".terraform/terraform.tfstate" ]; then
    log_warn "Terraform não foi inicializado! Execute primeiro o deploy.sh"
    exit 1
fi

# Obter IP do Frontend (será usado como IP público da EC2)
FRONTEND_IP=$(terraform output -raw frontend_public_ip 2>/dev/null)

if [ -z "$FRONTEND_IP" ]; then
    log_warn "Não foi possível obter o IP do frontend!"
    log_info "Certifique-se de que a infraestrutura foi deployada."
    exit 1
fi

log_info "IP do Frontend (EC2): $FRONTEND_IP"

# Caminho do projeto (assumindo que estamos em terraform/)
PROJECT_ROOT="$(cd .. && pwd)"
SAFESTOCK_DIR="$PROJECT_ROOT"

log_info "Configurando arquivos de ambiente..."

# 1. Configurar .env.aws
log_info "1/2 Configurando .env.aws..."
cat > "$SAFESTOCK_DIR/.env.aws" << EOF
# Configurações AWS - SafeStock
# Gerado automaticamente pelo script configure-env.sh

AWS_EC2_IP=$FRONTEND_IP

# Este arquivo é usado pelo docker-compose.aws.yml
# Para deploy: docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws up -d
EOF

log_info "✅ Arquivo .env.aws atualizado: AWS_EC2_IP=$FRONTEND_IP"

# 2. Configurar .env.production do frontend
log_info "2/2 Configurando .env.production do frontend..."
cat > "$SAFESTOCK_DIR/Front-end/Plataforma/.env.production" << EOF
# Configurações de Produção - SafeStock AWS
# Gerado automaticamente pelo script configure-env.sh

VITE_API_BASE_URL=http://$FRONTEND_IP:8081
VITE_ENV=production

# Este arquivo é usado quando BUILD_MODE=prod no Docker
EOF

log_info "✅ Arquivo .env.production atualizado: VITE_API_BASE_URL=http://$FRONTEND_IP:8081"

# Resumo
echo ""
log_info "============================================"
log_info "Configuração concluída com sucesso!"
log_info "============================================"
echo ""
echo "Arquivos configurados:"
echo "  ✅ .env.aws"
echo "  ✅ Front-end/Plataforma/.env.production"
echo ""
echo "Variáveis configuradas:"
echo "  📍 IP Frontend: $FRONTEND_IP"
echo "  🌐 API URL: http://$FRONTEND_IP:8081"
echo ""
log_info "Próximo passo: fazer commit e push para o repositório Git"
echo ""
echo "Comandos sugeridos:"
echo "  cd $SAFESTOCK_DIR"
echo "  git add .env.aws Front-end/Plataforma/.env.production"
echo '  git commit -m "Configure AWS environment variables"'
echo "  git push origin main"
echo ""
log_info "Depois que fizer push, rode o update-apps.sh para aplicar nos servidores!"
