#!/bin/bash

echo "========================================"
echo "SafeStock Terraform Validation"
echo "========================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

ERRORS=0

# Verificar arquivos obrigatórios
log_info "Verificando arquivos obrigatórios..."

FILES=("main.tf" "variables.tf" "outputs.tf")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file existe"
    else
        log_error "❌ $file não encontrado"
        ERRORS=$((ERRORS + 1))
    fi
done

# Verificar user-data scripts
log_info "Verificando user-data scripts..."

USER_DATA_FILES=(
    "user-data/frontend-user-data.sh"
    "user-data/backend-user-data.sh" 
    "user-data/database-user-data.sh"
)

for file in "${USER_DATA_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file existe"
    else
        log_error "❌ $file não encontrado"
        ERRORS=$((ERRORS + 1))
    fi
done

# Verificar scripts
log_info "Verificando scripts de deployment..."

SCRIPT_FILES=(
    "scripts/deploy.sh"
    "scripts/update-apps.sh"
)

for file in "${SCRIPT_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file existe"
    else
        log_error "❌ $file não encontrado"
        ERRORS=$((ERRORS + 1))
    fi
done

# Verificar terraform.tfvars
if [ -f "terraform.tfvars" ]; then
    log_info "✅ terraform.tfvars existe"
elif [ -f "terraform.tfvars.example" ]; then
    log_warn "⚠️  terraform.tfvars não existe, mas terraform.tfvars.example encontrado"
    log_info "Execute: cp terraform.tfvars.example terraform.tfvars"
else
    log_error "❌ Nenhum arquivo de variáveis encontrado"
    ERRORS=$((ERRORS + 1))
fi

# Verificar Terraform instalado
log_info "Verificando ferramentas..."

if command -v terraform &> /dev/null; then
    TERRAFORM_VERSION=$(terraform version -json | grep -o '"terraform_version":"[^"]*"' | cut -d'"' -f4)
    log_info "✅ Terraform $TERRAFORM_VERSION instalado"
else
    log_error "❌ Terraform não instalado"
    ERRORS=$((ERRORS + 1))
fi

if command -v aws &> /dev/null; then
    log_info "✅ AWS CLI instalado"
else
    log_warn "⚠️  AWS CLI não instalado (necessário para deploy)"
fi

# Validar sintaxe Terraform (se instalado)
if command -v terraform &> /dev/null; then
    log_info "Validando sintaxe Terraform..."
    
    if terraform init -backend=false &>/dev/null; then
        log_info "✅ Terraform init OK"
        
        if terraform validate &>/dev/null; then
            log_info "✅ Terraform validate OK"
        else
            log_error "❌ Terraform validate falhou"
            terraform validate
            ERRORS=$((ERRORS + 1))
        fi
    else
        log_error "❌ Terraform init falhou"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Verificar README
if [ -f "README.md" ]; then
    log_info "✅ README.md existe"
else
    log_warn "⚠️  README.md não encontrado"
fi

# Verificar nomenclatura
log_info "Verificando nomenclatura (convenção sf-*)..."

if grep -q "sf-vpc-principal" main.tf; then
    log_info "✅ Nomenclatura VPC correta"
else
    log_error "❌ Nomenclatura VPC incorreta"
    ERRORS=$((ERRORS + 1))
fi

if grep -q "sf-subnet-publica-frontend" main.tf; then
    log_info "✅ Nomenclatura Subnets correta"
else
    log_error "❌ Nomenclatura Subnets incorreta"
    ERRORS=$((ERRORS + 1))
fi

# Verificar estrutura de diretórios
log_info "Verificando estrutura de diretórios..."

DIRS=("user-data" "scripts")
for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        log_info "✅ Diretório $dir/ existe"
    else
        log_error "❌ Diretório $dir/ não encontrado"
        ERRORS=$((ERRORS + 1))
    fi
done

# Resultado final
echo ""
if [ $ERRORS -eq 0 ]; then
    log_info "🎉 VALIDAÇÃO CONCLUÍDA COM SUCESSO!"
    log_info "Todos os arquivos estão presentes e a sintaxe está correta."
    log_info ""
    log_info "Próximos passos:"
    log_info "1. Configure terraform.tfvars se necessário"
    log_info "2. Execute: ./scripts/deploy.sh"
    log_info "3. Ou execute: terraform init && terraform plan && terraform apply"
    exit 0
else
    log_error "❌ VALIDAÇÃO FALHOU!"
    log_error "Encontrados $ERRORS erro(s). Corrija-os antes de continuar."
    exit 1
fi