#!/bin/bash

# 🚀 Script de Inicialização Local - SafeStock
# Uso: bash start-local.sh

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         SafeStock - Ambiente Local (Docker Compose)            ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warning() { echo -e "${YELLOW}⚠${NC} $1"; }

# 1. Verificar arquivo .env.local
log_info "Verificando configuração local..."
if [ ! -f ".env.local" ]; then
    log_warning ".env.local não encontrado. Criando do exemplo..."
    cp .env.example .env.local
fi
log_success "Arquivo .env.local ok"

# 2. Parar containers antigos
log_info "Parando containers antigos..."
docker compose down --remove-orphans 2>/dev/null || true

# 3. Perguntar sobre limpar BD
read -p "Deseja limpar os dados do banco de dados local? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    log_warning "Removendo volumes..."
    docker compose down -v
fi

# 4. Fazer build
log_info "Fazendo build das imagens..."
docker compose build

# 5. Iniciar
log_info "Iniciando containers..."
docker compose up -d

# 6. Aguardar
log_info "Aguardando serviços (até 2 minutos)..."
for i in {1..60}; do
    if docker compose ps | grep -q "Up"; then
        log_success "Serviços iniciados!"
        break
    fi
    echo -n "."
    sleep 2
done

# 7. Status
log_info "Status dos containers:"
docker compose ps

# 8. Informações
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    ✓ PRONTO PARA USAR!                         ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║                                                                ║"
echo "║  🌐 Frontend:  http://localhost                                ║"
echo "║  🔧 Backend:   http://localhost:8081/api                       ║"
echo "║  📊 Logs:      docker compose logs -f                          ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

log_success "SafeStock rodando localmente! 🎉"
