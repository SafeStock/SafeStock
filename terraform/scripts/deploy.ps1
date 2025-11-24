# DEPLOYMENT SCRIPT - INFRAESTRUTURA SAFESTOCK (AWS) - PowerShell Version
param(
    [string]$Action = ""
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SafeStock AWS Infrastructure Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Funções para log colorido
function Write-Info {
    param($message)
    Write-Host "[INFO] $message" -ForegroundColor Green
}

function Write-Warn {
    param($message)
    Write-Host "[WARN] $message" -ForegroundColor Yellow
}

function Write-Error {
    param($message)
    Write-Host "[ERROR] $message" -ForegroundColor Red
}

# Verificar pré-requisitos
Write-Info "Verificando pre-requisitos..."

# Verificar Terraform
if (-not (Get-Command terraform -ErrorAction SilentlyContinue)) {
    Write-Error "Terraform nao esta instalado!"
    exit 1
}

# Verificar AWS CLI
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Error "AWS CLI nao esta instalado!"
    exit 1
}

# Verificar credenciais AWS
try {
    aws sts get-caller-identity *>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Credenciais AWS nao configuradas"
    }
} catch {
    Write-Error "Credenciais AWS nao configuradas!"
    Write-Info "Execute: aws configure"
    exit 1
}

# Verificar se terraform.tfvars existe
if (-not (Test-Path "terraform.tfvars")) {
    Write-Warn "Arquivo terraform.tfvars nao encontrado"
    Write-Info "Criando terraform.tfvars padrao..."
    
    $tfvarsContent = @'
# ================================================================
# SAFESTOCK TERRAFORM VARIABLES
# ================================================================

# AWS Configuration
aws_region = "us-east-1"

# Project Configuration
project_name = "SafeStock"
environment = "prod"

# Repository Configuration (FLEXIVEL)
repository_url = "https://github.com/SafeStock/SafeStock.git"

# Network Configuration
vpc_cidr = "10.0.0.0/16"
subnet_publica_frontend_cidr = "10.0.1.0/24"
subnet_publica_lb_cidr = "10.0.2.0/24"
subnet_privada_backend_cidr = "10.0.10.0/24"
subnet_privada_database_cidr = "10.0.20.0/24"

# EC2 Configuration
instance_type_frontend = "t3.medium"
instance_type_backend = "t3.small"

# Security Configuration
key_pair_name = "sf-keypair-prod"
allowed_ssh_cidr = ["0.0.0.0/0"]  # ⚠️ Restringir em produção
allowed_http_cidr = ["0.0.0.0/0"]

# Database Configuration
mysql_root_password = "SafeStock@Root2024!"
mysql_app_password = "safestock123"

# Availability Zones
availability_zones = ["us-east-1a", "us-east-1b"]
'@

    Set-Content -Path "terraform.tfvars" -Value $tfvarsContent -Encoding UTF8
    Write-Info "Arquivo terraform.tfvars criado. Edite se necessario."
}

# Menu de opções se não foi passado parâmetro
if (-not $Action) {
    Write-Host ""
    Write-Info "Escolha uma opcao:"
    Write-Host "1. Deploy completo (init + plan + apply)"
    Write-Host "2. Apenas planejar (terraform plan)"
    Write-Host "3. Aplicar mudancas (terraform apply)"
    Write-Host "4. Destruir infraestrutura (terraform destroy)"
    Write-Host "5. Validar configuracao"
    Write-Host "6. Mostrar outputs"
    
    $choice = Read-Host "Digite sua escolha (1-6)"
} else {
    $choice = $Action
}

switch ($choice) {
    "1" {
        Write-Info "Iniciando deploy completo..."
        
        # Terraform init
        Write-Info "Executando terraform init..."
        terraform init
        if ($LASTEXITCODE -ne 0) { exit 1 }
        
        # Terraform validate
        Write-Info "Validando configuracao..."
        terraform validate
        if ($LASTEXITCODE -ne 0) { exit 1 }
        
        # Pre-deploy IP update ANTES do plan
        Write-Host ""
        Write-Info "Preparando IPs antes do apply..."
        if (Test-Path "scripts\pre-deploy-update.ps1") {
            & ".\scripts\pre-deploy-update.ps1"
        } else {
            Write-Warn "Script pre-deploy-update.ps1 nao encontrado!"
        }
        
        # Terraform plan
        Write-Info "Executando terraform plan..."
        terraform plan -out=tfplan
        if ($LASTEXITCODE -ne 0) { exit 1 }
        
        # Confirmar apply
        Write-Host ""
        Write-Warn "Revisao do plano concluida. Deseja aplicar as mudancas?"
        $confirm = Read-Host "Digite 'yes' para continuar"
        
        if ($confirm -eq "yes") {
            # Terraform apply
            Write-Info "Executando terraform apply..."
            terraform apply tfplan
            if ($LASTEXITCODE -ne 0) { exit 1 }
            
            # Confirmação final dos IPs após apply
            Write-Host ""
            Write-Info "Confirmando IPs apos apply..."
            if (Test-Path "scripts\pre-deploy-update.ps1") {
                & ".\scripts\pre-deploy-update.ps1"
            } else {
                Write-Warn "Script pre-deploy-update.ps1 nao encontrado!"
            }
            
            # Mostrar outputs importantes
            Write-Host ""
            Write-Info "============ DEPLOYMENT CONCLUIDO ============"
            terraform output
            
            Write-Info "URLs importantes:"
            try {
                $frontendUrl = terraform output -raw frontend_url 2>$null
                $apiUrl = terraform output -raw api_url 2>$null
                if ($frontendUrl) { Write-Host "Frontend: $frontendUrl" } else { Write-Host "Frontend: N/A" }
                if ($apiUrl) { Write-Host "API: $apiUrl" } else { Write-Host "API: N/A" }
            } catch {
                Write-Host "Frontend: N/A"
                Write-Host "API: N/A"
            }
            
        } else {
            Write-Info "Deploy cancelado pelo usuario."
        }
    }
    
    "2" {
        Write-Info "Executando terraform plan..."
        terraform init -upgrade
        terraform validate
        terraform plan
    }
    
    "3" {
        Write-Info "Executando terraform apply..."
        terraform apply
    }
    
    "4" {
        Write-Warn "ATENCAO: Isto ira DESTRUIR toda a infraestrutura!"
        $confirm = Read-Host "Digite 'destroy' para confirmar"
        
        if ($confirm -eq "destroy") {
            Write-Info "Destruindo infraestrutura..."
            terraform destroy
        } else {
            Write-Info "Destruicao cancelada."
        }
    }
    
    "5" {
        Write-Info "Validando configuracao..."
        terraform init -upgrade
        terraform validate
        terraform fmt -check
        Write-Info "Validacao concluida!"
    }
    
    "6" {
        Write-Info "Outputs do Terraform:"
        terraform output
    }
    
    default {
        Write-Error "Opcao invalida!"
        exit 1
    }
}

Write-Info "Script concluido!"