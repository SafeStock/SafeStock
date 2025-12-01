#!/bin/bash
# DEPLOYMENT SCRIPT - INFRASESTRUTURA SAFESTOCK (AWS)
set -e

echo "========================================"
echo "SafeStock AWS Infrastructure Deployment"
echo "========================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Verificar pré-requisitos
log_info "Verificando pré-requisitos..."

# Verificar Terraform
if ! command -v terraform &> /dev/null; then
    log_error "Terraform não está instalado!"
    exit 1
fi

# Verificar AWS CLI
if ! command -v aws &> /dev/null; then
    log_error "AWS CLI não está instalado!"
    exit 1
fi

# Verificar credenciais AWS
if ! aws sts get-caller-identity &> /dev/null; then
    log_error "Credenciais AWS não configuradas!"
    log_info "Execute: aws configure"
    exit 1
fi

# Verificar se a chave SSH existe
KEY_PATH="$HOME/.ssh/sf-keypair-main"
if [ ! -f "${KEY_PATH}.pem" ] && [ ! -f "${KEY_PATH}" ]; then
    log_warn "Chave SSH não encontrada em $KEY_PATH"
    log_info "Criando par de chaves SSH..."
    
    # Criar chave SSH
    ssh-keygen -t rsa -b 2048 -f "$KEY_PATH" -N "" -C "safestock-aws-key"
    
    # Criar arquivo .pub se não existir
    if [ ! -f "${KEY_PATH}.pub" ]; then
        ssh-keygen -y -f "$KEY_PATH" > "${KEY_PATH}.pub"
    fi
    
    log_info "Chave SSH criada: ${KEY_PATH}"
fi

# Verificar se terraform.tfvars existe
if [ ! -f "terraform.tfvars" ]; then
    log_warn "Arquivo terraform.tfvars não encontrado"
    log_info "Criando terraform.tfvars padrão..."
    
cat > terraform.tfvars << 'EOF'
# ================================================================
# SAFESTOCK TERRAFORM VARIABLES
# ================================================================

# AWS Configuration
aws_region = "us-east-1"

# Project Configuration
project_name = "SafeStock"
environment = "prod"

# Repository Configuration (FLEXÍVEL)
repository_url = "https://github.com/SafeStock/SafeStock.git"

# Network Configuration
vpc_cidr = "10.0.0.0/16"
subnet_publica_frontend_cidr = "10.0.1.0/24"
subnet_publica_lb_cidr = "10.0.2.0/24"
subnet_privada_backend_cidr = "10.0.10.0/24"
subnet_privada_database_cidr = "10.0.20.0/24"

# EC2 Configuration
instance_type_frontend = "t3.micro"
instance_type_backend = "t3.small"
instance_type_database = "t3.small"

# Security Configuration
key_pair_name = "sf-keypair-main"
allowed_ssh_cidr = ["0.0.0.0/0"]  # ⚠️ Restringir em produção
allowed_http_cidr = ["0.0.0.0/0"]

# Database Configuration
mysql_root_password = "SafeStock@Root2024!"
mysql_app_password = "safestock123"

# Availability Zones
availability_zones = ["us-east-1a", "us-east-1b"]
EOF

    log_info "Arquivo terraform.tfvars criado. Edite se necessário."
fi

# Menu de opções
echo ""
log_info "Escolha uma opção:"
echo "1. Deploy completo (init + plan + apply)"
echo "2. Apenas planejar (terraform plan)"
echo "3. Aplicar mudanças (terraform apply)"
echo "4. Destruir infraestrutura (terraform destroy)"
echo "5. Validar configuração"
echo "6. Mostrar outputs"

read -p "Digite sua escolha (1-6): " choice

case $choice in
    1)
        log_info "Iniciando deploy completo..."
        
        # Terraform init
        log_info "Executando terraform init..."
        terraform init
        
        # Terraform validate
        log_info "Validando configuração..."
        terraform validate
        
        # Terraform plan
        log_info "Executando terraform plan..."
        terraform plan -out=tfplan
        
        # Pre-deploy IP update ANTES do apply
        echo ""
        log_info "Preparando IPs antes do apply..."
        if [ -f "scripts/pre-deploy-update.ps1" ]; then
            powershell.exe -ExecutionPolicy Bypass -File scripts/pre-deploy-update.ps1
        else
            log_warn "Script pre-deploy-update.ps1 não encontrado!"
        fi
        
        # Confirmar apply
        echo ""
        log_warn "Revisão do plano concluída. Deseja aplicar as mudanças?"
        read -p "Digite 'yes' para continuar: " confirm
        
        if [ "$confirm" = "yes" ]; then
            # Terraform apply
            log_info "Executando terraform apply..."
            terraform apply tfplan
            
            # Confirmação final dos IPs após apply
            echo ""
            log_info "Confirmando IPs após apply..."
            if [ -f "scripts/pre-deploy-update.ps1" ]; then
                powershell.exe -ExecutionPolicy Bypass -File scripts/pre-deploy-update.ps1
            else
                log_warn "Script pre-deploy-update.ps1 não encontrado!"
            fi
            
            # Mostrar outputs importantes
            echo ""
            log_info "============ DEPLOYMENT CONCLUÍDO ============"
            terraform output
            
            log_info "URLs importantes:"
            echo "Frontend: $(terraform output -raw frontend_url 2>/dev/null || echo 'N/A')"
            echo "API: $(terraform output -raw api_url 2>/dev/null || echo 'N/A')"
            
        else
            log_info "Deploy cancelado pelo usuário."
        fi
        ;;
        
    2)
        log_info "Executando terraform plan..."
        terraform init -upgrade
        terraform validate
        terraform plan
        ;;
        
    3)
        log_info "Executando terraform apply..."
        terraform apply
        ;;
        
    4)
        log_warn "⚠️  ATENÇÃO: Isto irá DESTRUIR toda a infraestrutura!"
        read -p "Digite 'destroy' para confirmar: " confirm
        
        if [ "$confirm" = "destroy" ]; then
            log_info "Destruindo infraestrutura..."
            terraform destroy
        else
            log_info "Destruição cancelada."
        fi
        ;;
        
    5)
        log_info "Validando configuração..."
        terraform init -upgrade
        terraform validate
        terraform fmt -check
        log_info "Validação concluída!"
        ;;
        
    6)
        log_info "Outputs do Terraform:"
        terraform output
        ;;
        
    *)
        log_error "Opção inválida!"
        exit 1
        ;;
esac

log_info "Script concluído!"