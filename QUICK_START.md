# 🚀 Guia Rápido: Executar SafeStock (Local vs AWS)

## ⚡ Quick Start - LOCAL

### Opção 1: Com Docker (RECOMENDADO)
```bash
# 1. Clonar o projeto
git clone https://github.com/SafeStock/Project-SafeStock-BackEnd.git
cd Project-SafeStock-BackEnd

# 2. Iniciar com script
bash start-local.sh

# Ou manualmente:
docker compose --env-file .env.local down -v
docker compose --env-file .env.local up --build -d

# 3. Acessar
# Frontend: http://localhost
# Backend: http://localhost:8081/api
```

### Opção 2: Sem Script
```bash
# Setup inicial
cp .env.example .env.local

# Iniciar tudo
docker compose down -v
docker compose up --build -d

# Ver logs
docker compose logs -f

# Parar
docker compose down
```

---

## 🌐 Deploy em AWS EC2

### Pré-requisitos
- [ ] EC2 t3.large ou maior (Ubuntu 22.04 LTS)
- [ ] IP Elástico alocado
- [ ] Security Group com portas abertas:
  - 80 (HTTP) - Público
  - 22 (SSH) - Para sua máquina
  - 443 (HTTPS) - Futuro

### Deployment (Automático)
```bash
# 1. Conectar via SSH
ssh -i sua-key.pem ubuntu@seu-eip.com

# 2. Clonar o projeto
git clone https://github.com/SafeStock/Project-SafeStock-BackEnd.git
cd Project-SafeStock-BackEnd

# 3. Executar script de deploy
bash deploy-aws.sh

# Script faz automaticamente:
# ✅ Obtém IP Elástico
# ✅ Instala Docker
# ✅ Cria arquivo .env
# ✅ Inicia containers
# ✅ Testa conectividade

# 4. Acessar
# Frontend: http://seu-eip.com
# Backend: http://seu-eip.com/api
```

### Deployment (Manual)
```bash
# 1. Conectar
ssh -i sua-key.pem ubuntu@seu-eip.com

# 2. Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# 3. Clonar e configurar
git clone https://github.com/SafeStock/Project-SafeStock-BackEnd.git
cd Project-SafeStock-BackEnd
cp .env.production .env

# 4. Editar .env com seu EIP
nano .env
# Procure por: seu-eip-aqui.com
# Substitua pelo seu IP real

# 5. Iniciar
docker compose down -v
docker compose up --build -d

# 6. Verificar
docker compose ps
```

---

## 📁 Arquivos de Configuração

### `.env.local` - Desenvolvimento Local
```env
ENVIRONMENT=local
FRONTEND_URL=http://localhost
SPRING_PROFILES_ACTIVE=dev
```
**Uso:** `docker compose --env-file .env.local up`

### `.env.production` - AWS EC2
```env
ENVIRONMENT=production
FRONTEND_URL=http://seu-eip.com
SPRING_PROFILES_ACTIVE=prod
```
**Uso:** `docker compose --env-file .env.production up`

### `.env` - Arquivo Dinâmico (criado pelo script)
Criado automaticamente pelos scripts de deploy com valores específicos.

---

## 🔄 Fluxo de Variáveis

```
┌─────────────────────────────────────────┐
│        docker-compose.yml               │
│  (Referencia ${VAR:-default})           │
└─────────────────┬───────────────────────┘
                  │
         Busca em ordem:
         1. .env (arquivo dinâmico)
         2. Variáveis do sistema
         3. Valor padrão (após :-)
         │
         ↓
┌─────────────────────────────────────────┐
│   Containers com valores interpolados   │
│   - MySQL: ${MYSQL_HOST:-mysql}         │
│   - Backend: ${SPRING_PROFILES_ACTIVE}  │
│   - Frontend: ${FRONTEND_URL}           │
└─────────────────────────────────────────┘
```

---

## 📊 Comparação: Local vs AWS

| Aspecto | LOCAL | AWS |
|---------|-------|-----|
| Arquivo env | `.env.local` | `.env.production` (renomeado para `.env`) |
| Script | `start-local.sh` | `deploy-aws.sh` |
| FRONTEND_URL | `http://localhost` | `http://seu-eip.com` |
| Docker | Local | EC2 instalado |
| Acesso | `localhost` | `seu-eip.com` |
| Persistência | Volume local | EBS |
| IP fixo? | Não | Sim (EIP) |

---

## 🔍 Troubleshooting

### ❌ "Ports are in use"
```bash
# Local - Liberar portas
docker compose down -v
docker system prune -a --volumes

# AWS - Verificar firewall
sudo ufw status
```

### ❌ "Backend unhealthy"
```bash
# Ver logs
docker compose logs backend-1

# Verificar DB
docker compose exec backend-1 curl http://localhost:8080/api/produtos/public/paged
```

### ❌ "Frontend não encontra API"
```bash
# Verificar FRONTEND_URL no .env
grep FRONTEND_URL .env

# Se local: deve ser http://localhost
# Se AWS: deve ser http://seu-eip.com
```

---

## 🛠️ Gerenciamento de Containers

### Ver Status
```bash
docker compose ps
```

### Ver Logs
```bash
# Todos
docker compose logs

# De um serviço
docker compose logs backend-1

# Em tempo real
docker compose logs -f
```

### Parar/Iniciar
```bash
# Parar
docker compose down

# Parar e remover volumes
docker compose down -v

# Reiniciar
docker compose restart

# Rebuild e restart
docker compose up --build -d
```

### Executar Comandos
```bash
# No container MySQL
docker compose exec mysql mysql -u root -p

# No backend
docker compose exec backend-1 bash

# Verificar saúde
docker compose exec backend-1 curl http://localhost:8080/actuator/health
```

---

## 📈 Monitoramento

### Health Check
```bash
# Frontend
curl http://localhost/frontend-health

# Backend (local)
curl http://localhost:8081/api/produtos/public/paged

# Backend (AWS)
curl http://seu-eip.com/api/produtos/public/paged
```

### Uso de Recursos
```bash
# CPU e Memória
docker stats

# Detalhes de um container
docker inspect sf-mysql | grep -i memory
```

---

## 🔐 Segurança - ANTES de Ir para Produção

### ⚠️ Mudar Senhas Padrão
```bash
# Editar .env.production
nano .env.production

# Mudar:
# MYSQL_PASSWORD=admin123 → MYSQL_PASSWORD=SenhaForteAqui123!
# RABBITMQ_PASSWORD=admin123 → RABBITMQ_PASSWORD=SenhaForteAqui456!
```

### 🔒 Configurar SSL/TLS
```bash
# No EC2, instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot certonly --standalone -d seu-eip.com
```

### 🛡️ Hardening de Segurança
```bash
# Firewall
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Limpar containers e imagens não usadas
docker system prune -a --volumes
```

---

## 📚 Documentação Adicional

- [VALIDACAO_CONFIGURACAO_LOCAL.md](VALIDACAO_CONFIGURACAO_LOCAL.md) - Análise completa do projeto
- [GUIA_AWS_DEPLOYMENT.md](GUIA_AWS_DEPLOYMENT.md) - Detalhes sobre AWS
- `.env.example` - Template com todas as variáveis

---

## 🎯 Checklist de Deploy

### Local
- [ ] Clonar repositório
- [ ] Criar `.env.local`
- [ ] Executar `docker compose up --build -d`
- [ ] Acessar `http://localhost`
- [ ] Testar login

### AWS
- [ ] EC2 criada e EIP associado
- [ ] Security Group configurado
- [ ] Conectar via SSH
- [ ] Clonar repositório
- [ ] Executar `bash deploy-aws.sh`
- [ ] Verificar IP Elástico em `.env`
- [ ] Acessar `http://seu-eip.com`
- [ ] Alterar senhas padrão
- [ ] Configurar SSL

---

**Versão:** 2.0  
**Última atualização:** 13 de dezembro de 2025
