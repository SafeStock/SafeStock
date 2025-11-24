# Script PowerShell para atualizar aplicações SafeStock na AWS
# Arquitetura: Frontend (nginx + containers) + Backend (containers privados)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SafeStock Application Update Script" -ForegroundColor Cyan
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

# Verificar se terraform está inicializado
if (-not (Test-Path ".terraform\terraform.tfstate") -and -not (Test-Path "terraform.tfstate")) {
    Write-Error "Terraform nao foi inicializado neste diretorio!"
    Write-Info "Execute: terraform init"
    exit 1
}

# Obter IPs dos servidores
Write-Info "Obtendo informacoes dos servidores..."

try {
    $FrontendIP = terraform output -raw frontend_public_ip 2>$null
    $BackendIP = terraform output -raw backend_containers_private_ip 2>$null
    
    if (-not $FrontendIP) {
        throw "IP do frontend nao encontrado"
    }
} catch {
    Write-Error "Nao foi possivel obter os IPs dos servidores!"
    Write-Info "Verifique se a infraestrutura foi deployada corretamente."
    exit 1
}

Write-Info "Servidores encontrados:"
Write-Host "  Frontend (Nginx + Containers): $FrontendIP"
Write-Host "  Backend Containers (Privado): $BackendIP"

# Verificar chave SSH
$KeyPath = "ssh-keys\sf-keypair-prod.pem"
if (-not (Test-Path $KeyPath)) {
    Write-Error "Chave SSH nao encontrada: $KeyPath"
    exit 1
}

# Menu de opções
Write-Host ""
Write-Info "Escolha o que deseja fazer:"
Write-Host "1. Atualizar aplicacao (git pull + restart containers)"
Write-Host "2. Reiniciar todos os servicos"
Write-Host "3. Ver status dos containers"
Write-Host "4. Ver logs dos containers"
Write-Host "5. Teste de conectividade"
Write-Host "6. Aplicar configuracoes de IP atualizadas"

$choice = Read-Host "Digite sua escolha (1-6)"

# Função para executar comando SSH
function SSH-Execute {
    param($ip, $command, $serverName)
    
    Write-Step "Executando em $serverName ($ip)..."
    try {
        ssh -o StrictHostKeyChecking=no -i $KeyPath ubuntu@$ip $command
        if ($LASTEXITCODE -ne 0) {
            Write-Warn "Comando pode ter falhado em $serverName"
        }
    } catch {
        Write-Error "Erro ao conectar com $serverName"
    }
}

# Função para verificar conectividade
function Test-ServerConnection {
    param($ip, $serverName)
    
    Write-Info "Testando conectividade com $serverName..."
    try {
        ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no -i $KeyPath ubuntu@$ip "echo 'Conexao OK'"
        if ($LASTEXITCODE -eq 0) {
            Write-Info "$serverName esta acessivel"
            return $true
        }
    } catch {
        Write-Error "$serverName nao esta acessivel!"
        return $false
    }
}

switch ($choice) {
    "1" {
        Write-Info "Atualizando aplicacao..."
        
        if (Test-ServerConnection $FrontendIP "Frontend") {
            SSH-Execute $FrontendIP "cd SafeStock && git pull origin main" "Frontend"
            SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws down" "Frontend"
            SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws up -d --build" "Frontend"
            Write-Info "Aplicacao atualizada com sucesso!"
        }
    }
    
    "2" {
        Write-Info "Reiniciando todos os servicos..."
        
        if (Test-ServerConnection $FrontendIP "Frontend") {
            SSH-Execute $FrontendIP "sudo systemctl restart nginx" "Frontend"
            SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws restart" "Frontend"
            Write-Info "Servicos reiniciados!"
        }
    }
    
    "3" {
        Write-Info "Verificando status dos containers..."
        
        if (Test-ServerConnection $FrontendIP "Frontend") {
            Write-Host "=== NGINX STATUS ===" -ForegroundColor Yellow
            SSH-Execute $FrontendIP "sudo systemctl status nginx --no-pager" "Frontend"
            Write-Host ""
            Write-Host "=== DOCKER CONTAINERS ===" -ForegroundColor Yellow
            SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws ps" "Frontend"
        }
    }
    
    "4" {
        Write-Info "Escolha qual log visualizar:"
        Write-Host "1. Nginx"
        Write-Host "2. Backend Antigo"
        Write-Host "3. Backend Refatorado"
        Write-Host "4. MySQL"
        Write-Host "5. RabbitMQ"
        Write-Host "6. Todos os containers"
        
        $logChoice = Read-Host "Escolha (1-6)"
        
        if (Test-ServerConnection $FrontendIP "Frontend") {
            switch ($logChoice) {
                "1" { SSH-Execute $FrontendIP "sudo journalctl -u nginx -f --lines=50" "Frontend" }
                "2" { SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws logs -f back-antigo" "Frontend" }
                "3" { SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws logs -f back-refatorado" "Frontend" }
                "4" { SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws logs -f mysql" "Frontend" }
                "5" { SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws logs -f rabbitmq" "Frontend" }
                "6" { SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws logs -f" "Frontend" }
            }
        }
    }
    
    "5" {
        Write-Info "Testando conectividade e servicos..."
        
        if (Test-ServerConnection $FrontendIP "Frontend") {
            Write-Host "=== TESTE HTTP ===" -ForegroundColor Yellow
            try {
                $response = Invoke-WebRequest -Uri "http://$FrontendIP" -TimeoutSec 10 -UseBasicParsing
                Write-Info "Frontend respondendo: HTTP $($response.StatusCode)"
            } catch {
                Write-Warn "Frontend nao esta respondendo HTTP"
            }
            
            Write-Host "=== TESTE API ===" -ForegroundColor Yellow
            try {
                $response = Invoke-WebRequest -Uri "http://$FrontendIP:8081/api/health" -TimeoutSec 10 -UseBasicParsing
                Write-Info "API respondendo: HTTP $($response.StatusCode)"
            } catch {
                Write-Warn "API nao esta respondendo"
            }
        }
    }
    
    "6" {
        Write-Info "Aplicando configuracoes de IP atualizadas..."
        
        if (Test-ServerConnection $FrontendIP "Frontend") {
            # Copiar arquivos de configuração atualizados
            Write-Step "Copiando .env.aws atualizado..."
            scp -o StrictHostKeyChecking=no -i $KeyPath "..\\.env.aws" ubuntu@$FrontendIP`:SafeStock/.env.aws
            
            Write-Step "Copiando .env.production atualizado..."
            scp -o StrictHostKeyChecking=no -i $KeyPath "..\\Front-end\\Plataforma\\.env.production" ubuntu@$FrontendIP`:SafeStock/Front-end/Plataforma/.env.production
            
            # Rebuild containers com novas configurações
            SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws down" "Frontend"
            SSH-Execute $FrontendIP "cd SafeStock && docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws up -d --build" "Frontend"
            
            Write-Info "Configuracoes aplicadas com sucesso!"
        }
    }
    
    default {
        Write-Error "Opcao invalida!"
        exit 1
    }
}

Write-Info "Operacao concluida!"

# Mostrar URLs da aplicação
Write-Host ""
Write-Info "URLs da aplicacao:"
Write-Host "Frontend: http://$FrontendIP" -ForegroundColor Green
Write-Host "API: http://$FrontendIP" + ":8081/api" -ForegroundColor Green