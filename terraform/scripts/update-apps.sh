#!/bin/bash

set -e

echo "========================================"
echo "SafeStock Application Update Script"
echo "========================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Verificar se terraform está inicializado
if [ ! -f ".terraform/terraform.tfstate" ]; then
    log_error "Terraform não foi inicializado neste diretório!"
    log_info "Execute: terraform init"
    exit 1
fi

# Obter IPs dos servidores
log_info "Obtendo informações dos servidores..."

FRONTEND_IP=$(terraform output -raw frontend_public_ip 2>/dev/null)
BACKEND_01_IP=$(terraform output -raw backend_01_public_ip 2>/dev/null)
BACKEND_02_IP=$(terraform output -raw backend_02_public_ip 2>/dev/null)
DATABASE_IP=$(terraform output -raw database_public_ip 2>/dev/null)
KEY_PATH="$HOME/.ssh/sf-keypair-main"

if [ -z "$FRONTEND_IP" ]; then
    log_error "Não foi possível obter os IPs dos servidores!"
    log_info "Verifique se a infraestrutura foi deployada corretamente."
    exit 1
fi

log_info "Servidores encontrados:"
echo "  Frontend: $FRONTEND_IP"
echo "  Backend 01: $BACKEND_01_IP"
echo "  Backend 02: $BACKEND_02_IP"
echo "  Database: $DATABASE_IP"

# Menu de opções
echo ""
log_info "Escolha o que deseja atualizar:"
echo "1. Atualizar apenas Frontend"
echo "2. Atualizar apenas Backend"
echo "3. Atualizar Frontend + Backend"
echo "4. Verificar status dos serviços"
echo "5. Ver logs dos serviços"
echo "6. Reiniciar serviços"
echo "7. Backup do banco de dados"

read -p "Digite sua escolha (1-7): " choice

# Função para executar comando SSH
ssh_exec() {
    local ip=$1
    local cmd=$2
    local server_name=$3
    
    log_step "Executando em $server_name ($ip)..."
    ssh -o StrictHostKeyChecking=no -i "$KEY_PATH" ubuntu@$ip "$cmd"
}

# Função para verificar se servidor está acessível
check_server() {
    local ip=$1
    local server_name=$2
    
    if ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no -i "$KEY_PATH" ubuntu@$ip "echo 'OK'" &>/dev/null; then
        log_info "$server_name está acessível"
        return 0
    else
        log_error "$server_name não está acessível!"
        return 1
    fi
}

case $choice in
    1)
        log_info "Atualizando Frontend..."
        
        if check_server $FRONTEND_IP "Frontend"; then
            ssh_exec $FRONTEND_IP "sudo /opt/update-frontend.sh" "Frontend"
            log_info "✅ Frontend atualizado com sucesso!"
        fi
        ;;
        
    2)
        log_info "Atualizando Backend..."
        
        if check_server $BACKEND_01_IP "Backend 01"; then
            ssh_exec $BACKEND_01_IP "sudo /opt/update-backend.sh" "Backend 01"
        fi
        
        if check_server $BACKEND_02_IP "Backend 02"; then
            ssh_exec $BACKEND_02_IP "sudo /opt/update-backend.sh" "Backend 02"
        fi
        
        log_info "✅ Backend atualizado com sucesso!"
        ;;
        
    3)
        log_info "Atualizando Frontend + Backend..."
        
        # Atualizar Backend primeiro
        if check_server $BACKEND_01_IP "Backend 01"; then
            ssh_exec $BACKEND_01_IP "sudo /opt/update-backend.sh" "Backend 01"
        fi
        
        if check_server $BACKEND_02_IP "Backend 02"; then
            ssh_exec $BACKEND_02_IP "sudo /opt/update-backend.sh" "Backend 02"
        fi
        
        # Aguardar backends iniciarem
        log_info "Aguardando backends inicializarem..."
        sleep 30
        
        # Atualizar Frontend
        if check_server $FRONTEND_IP "Frontend"; then
            ssh_exec $FRONTEND_IP "sudo /opt/update-frontend.sh" "Frontend"
        fi
        
        log_info "✅ Aplicação atualizada completamente!"
        ;;
        
    4)
        log_info "Verificando status dos serviços..."
        
        echo "=== FRONTEND ==="
        ssh_exec $FRONTEND_IP "sudo systemctl status nginx --no-pager" "Frontend"
        
        echo ""
        echo "=== BACKEND 01 ==="
        ssh_exec $BACKEND_01_IP "sudo systemctl status safestock-backend --no-pager" "Backend 01"
        
        echo ""
        echo "=== BACKEND 02 ==="
        ssh_exec $BACKEND_02_IP "sudo systemctl status safestock-backend --no-pager" "Backend 02"
        
        echo ""
        echo "=== DATABASE ==="
        ssh_exec $DATABASE_IP "sudo systemctl status mysql --no-pager" "Database"
        ;;
        
    5)
        log_info "Escolha qual log visualizar:"
        echo "1. Frontend (Nginx)"
        echo "2. Backend 01"
        echo "3. Backend 02"
        echo "4. Database (MySQL)"
        
        read -p "Escolha (1-4): " log_choice
        
        case $log_choice in
            1)
                ssh_exec $FRONTEND_IP "sudo journalctl -u nginx -f --lines=50" "Frontend"
                ;;
            2)
                ssh_exec $BACKEND_01_IP "sudo journalctl -u safestock-backend -f --lines=50" "Backend 01"
                ;;
            3)
                ssh_exec $BACKEND_02_IP "sudo journalctl -u safestock-backend -f --lines=50" "Backend 02"
                ;;
            4)
                ssh_exec $DATABASE_IP "sudo journalctl -u mysql -f --lines=50" "Database"
                ;;
        esac
        ;;
        
    6)
        log_info "Reiniciando serviços..."
        
        # Reiniciar Database primeiro
        ssh_exec $DATABASE_IP "sudo systemctl restart mysql" "Database"
        
        # Aguardar database
        sleep 10
        
        # Reiniciar Backends
        ssh_exec $BACKEND_01_IP "sudo systemctl restart safestock-backend" "Backend 01"
        ssh_exec $BACKEND_02_IP "sudo systemctl restart safestock-backend" "Backend 02"
        
        # Aguardar backends
        sleep 20
        
        # Reiniciar Frontend
        ssh_exec $FRONTEND_IP "sudo systemctl restart nginx" "Frontend"
        
        log_info "✅ Todos os serviços foram reiniciados!"
        ;;
        
    7)
        log_info "Fazendo backup do banco de dados..."
        
        ssh_exec $DATABASE_IP "sudo /opt/mysql-backup.sh" "Database"
        
        # Baixar backup
        BACKUP_FILE=$(ssh -o StrictHostKeyChecking=no -i "$KEY_PATH" ubuntu@$DATABASE_IP "ls -t /opt/mysql-backups/*.gz | head -1")
        
        if [ ! -z "$BACKUP_FILE" ]; then
            log_info "Baixando backup..."
            scp -o StrictHostKeyChecking=no -i "$KEY_PATH" ubuntu@$DATABASE_IP:$BACKUP_FILE ./
            log_info "✅ Backup salvo localmente: $(basename $BACKUP_FILE)"
        fi
        ;;
        
    *)
        log_error "Opção inválida!"
        exit 1
        ;;
esac

log_info "Operação concluída!"

# Mostrar URLs da aplicação
echo ""
log_info "URLs da aplicação:"
echo "🌐 Frontend: http://$FRONTEND_IP"

ALB_DNS=$(terraform output -raw alb_dns_name 2>/dev/null)
if [ ! -z "$ALB_DNS" ]; then
    echo "🔗 API (Load Balancer): http://$ALB_DNS/api"
fi