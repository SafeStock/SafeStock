# Script PowerShell para atualizar IPs antes do deploy
# Executa antes de terraform apply para garantir IPs corretos nos containers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SafeStock - Pre-Deploy IP Update" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

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

function Write-Step {
    param($message)
    Write-Host "[STEP] $message" -ForegroundColor Blue
}

# Verificar se estamos no diretório terraform
if (-not (Test-Path "main.tf")) {
    Write-Error "Execute este script do diretório terraform/"
    exit 1
}

Write-Step "1/3 Verificando estado atual da infraestrutura..."

# Verificar se já existe infraestrutura deployada
if (-not (Test-Path "terraform.tfstate") -or (Get-Item "terraform.tfstate").Length -eq 0) {
    Write-Info "Primeiro deploy detectado - usando configuração padrão"
    
    # Para primeiro deploy, usar placeholder
    $ProjectRoot = Split-Path -Parent (Get-Location)
    $EnvAwsFile = Join-Path $ProjectRoot ".env.aws"
    $EnvProdFile = Join-Path $ProjectRoot "Front-end\Plataforma\.env.production"
    
    # Criar .env.aws com placeholder
    $EnvAwsContent = @"
# Configurações AWS - SafeStock
# Será atualizado automaticamente após primeiro deploy

AWS_EC2_IP=PLACEHOLDER_WILL_BE_UPDATED

# Este arquivo é usado pelo docker-compose.aws.yml
"@
    
    Set-Content -Path $EnvAwsFile -Value $EnvAwsContent -Encoding UTF8
    
    Write-Info "Arquivos preparados para primeiro deploy"
    Write-Info "Os IPs serao atualizados automaticamente apos o terraform apply"
    exit 0
}

Write-Step "2/3 Obtendo IP atual da infraestrutura..."

# Tentar obter IP atual
try {
    $CurrentIP = terraform output -raw frontend_public_ip 2>$null
    if (-not $CurrentIP -or $CurrentIP -eq "") {
        throw "IP não encontrado"
    }
} catch {
    Write-Error "Não foi possível obter o IP atual!"
    Write-Info "Execute 'terraform refresh' e tente novamente."
    exit 1
}

Write-Info "IP atual da infraestrutura: $CurrentIP"

Write-Step "3/3 Atualizando arquivos de configuração..."

# Caminhos dos arquivos
$ProjectRoot = Split-Path -Parent (Get-Location)
$EnvAwsFile = Join-Path $ProjectRoot ".env.aws"
$EnvProdFile = Join-Path $ProjectRoot "Front-end\Plataforma\.env.production"

# Atualizar .env.aws
$EnvAwsContent = @"
# Configurações AWS - SafeStock
# Atualizado antes do deploy em $(Get-Date)

AWS_EC2_IP=$CurrentIP

# Este arquivo é usado pelo docker-compose.aws.yml
# Para deploy: docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws up -d
"@

Set-Content -Path $EnvAwsFile -Value $EnvAwsContent -Encoding UTF8

# Atualizar .env.production
$EnvProdContent = @"
# Configurações de Produção - SafeStock AWS
# Atualizado antes do deploy em $(Get-Date)

VITE_API_BASE_URL=http://$CurrentIP:8081
VITE_ENV=production

# Este arquivo é usado quando BUILD_MODE=prod no Docker
"@

Set-Content -Path $EnvProdFile -Value $EnvProdContent -Encoding UTF8

Write-Info "Arquivo .env.aws atualizado: AWS_EC2_IP=$CurrentIP"
Write-Info "Arquivo .env.production atualizado: VITE_API_BASE_URL=http://$CurrentIP:8081"

Write-Host ""
Write-Info "============================================"
Write-Info "Pre-Deploy IP Update concluído!"
Write-Info "============================================"
Write-Host ""
Write-Host "Configuracao atual:"
Write-Host "  EC2 IP: $CurrentIP"
Write-Host "  API URL: http://$CurrentIP:8081"
Write-Host "  Frontend URL: http://$CurrentIP"
Write-Host ""
Write-Info "Os containers serao construidos com os IPs corretos!"