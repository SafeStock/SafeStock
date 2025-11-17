# 🚀 GUIA DE DEPLOY - SAFESTOCK

## ✅ VALIDAÇÃO DOS SCRIPTS CORRIGIDOS

### Scripts Atualizados:
- ✅ **frontend-user-data.sh** - Node.js via NVM, detecção inteligente
- ✅ **database-user-data.sh** - Validações, sintaxe corrigida, retry loops
- ✅ **backend-user-data.sh** - Validação de variáveis, detecção de estrutura
- ✅ **loadbalancer-user-data.sh** - Funcionando corretamente

---

## 📋 PRÉ-REQUISITOS

### 1. Verificar Credenciais AWS
```powershell
aws configure list
aws sts get-caller-identity
```

### 2. Verificar Terraform
```powershell
cd "C:\Users\pedro.novaes\Faculdade-SPtech\Projeto de extensão - SafeStock\SafeStock\terraform"
terraform version
```

### 3. Verificar Variáveis (terraform.tfvars)
```powershell
cat terraform.tfvars
```

**Deve conter:**
- `mysql_root_password`
- `mysql_app_password`
- `repository_url`
- Chaves SSH

---

## 🔥 OPÇÃO 1: DESTRUIR E RECRIAR (RECOMENDADO)

### Passo 1: Destruir Infraestrutura Atual
```powershell
cd "C:\Users\pedro.novaes\Faculdade-SPtech\Projeto de extensão - SafeStock\SafeStock\terraform"
terraform destroy -auto-approve
```

### Passo 2: Aplicar Nova Infraestrutura
```powershell
terraform apply -auto-approve
```

### Passo 3: Configurar Variáveis de Ambiente AWS
```bash
cd scripts
chmod +x configure-env.sh
./configure-env.sh
```

**O que este script faz:**
- ✅ Pega o IP público da EC2 automaticamente do Terraform
- ✅ Atualiza `.env.aws` com o IP
- ✅ Atualiza `Front-end/Plataforma/.env.production` com a API URL
- ✅ Prepara tudo para o próximo deploy

### Passo 4: Commit e Push das Configurações
```bash
cd ..
git add .env.aws Front-end/Plataforma/.env.production
git commit -m "Configure AWS environment variables"
git push origin main
```

### Passo 3: Aguardar (15-20 minutos)
- Frontend: ~5-8 minutos (build do React)
- Backend: ~3-5 minutos (build Maven)
- Database: ~3-5 minutos (MySQL 8.0)
- Load Balancer: ~1 minuto

### Passo 4: Obter IPs
```powershell
terraform output
```

---

## 🔄 OPÇÃO 2: ATUALIZAR INSTÂNCIAS EXISTENTES

### Método A: Taint (Força Recriação)
```powershell
# Frontend
terraform taint aws_instance.frontend

# Backend 01
terraform taint aws_instance.backend_01

# Backend 02
terraform taint 'aws_instance.backend_02[0]'

# Database
terraform taint aws_instance.database

# Load Balancer
terraform taint aws_instance.loadbalancer

# Aplicar mudanças
terraform apply -auto-approve
```

### Método B: Replace (Terraform 1.x+)
```powershell
terraform apply -replace=aws_instance.frontend -replace=aws_instance.database -auto-approve
```

---

## 📊 MONITORAMENTO DO DEPLOY

### 1. Verificar Status das Instâncias
```powershell
aws ec2 describe-instances `
  --filters "Name=tag:Project,Values=SafeStock" `
  --query 'Reservations[*].Instances[*].[Tags[?Key==`Name`].Value|[0],State.Name,PublicIpAddress]' `
  --output table
```

### 2. Conectar via SSH e Ver Logs

#### Frontend:
```powershell
ssh -i "terraform\ssh-keys\sf-keypair-prod.pem" ec2-user@<FRONTEND_IP>
sudo tail -f /var/log/user-data.log
```

#### Database:
```powershell
ssh -i "terraform\ssh-keys\sf-keypair-prod.pem" ec2-user@<DATABASE_PRIVATE_IP> -o ProxyJump=ec2-user@<BASTION_IP>
sudo tail -f /var/log/user-data.log
sudo tail -f /var/log/mysqld.log
```

#### Backend:
```powershell
ssh -i "terraform\ssh-keys\sf-keypair-prod.pem" ec2-user@<BACKEND_PRIVATE_IP> -o ProxyJump=ec2-user@<BASTION_IP>
sudo tail -f /var/log/user-data.log
sudo journalctl -u safestock-backend -f
```

---

## 🧪 TESTES APÓS DEPLOY

### 1. Frontend
```powershell
# Health check
curl http://<FRONTEND_IP>/health

# Verificar conteúdo
curl http://<FRONTEND_IP>/ | grep -i "safestock\|html"
```

### 2. Load Balancer
```powershell
curl http://<LOAD_BALANCER_IP>/health
```

### 3. Backend (via Load Balancer)
```powershell
curl http://<LOAD_BALANCER_IP>/actuator/health
curl http://<LOAD_BALANCER_IP>/api/
```

### 4. Database (via SSH)
```bash
mysql -u safestock -p -e "SHOW DATABASES;"
mysql -u safestock -p safestock -e "SHOW TABLES;"
```

---

## ⚠️ TROUBLESHOOTING

### Script user-data não executa:
```bash
# Verificar se cloud-init rodou
sudo systemctl status cloud-init
sudo cat /var/log/cloud-init.log

# Executar manualmente
sudo bash /var/lib/cloud/instance/scripts/part-001
```

### MySQL não inicia:
```bash
sudo systemctl status mysqld
sudo tail -100 /var/log/mysqld.log
sudo grep -i error /var/log/mysqld.log
```

### Frontend sem conteúdo:
```bash
# Verificar se o build foi feito
ls -la /usr/share/nginx/html/safestock/
cat /var/log/nginx/safestock-error.log
```

### Backend não conecta no MySQL:
```bash
# Testar conectividade
mysql -h <DATABASE_IP> -u safestock -p

# Ver logs do Spring Boot
sudo journalctl -u safestock-backend -n 100
```

---

## 🎯 COMANDOS RÁPIDOS

### Ver todos os outputs:
```powershell
terraform output -json | ConvertFrom-Json
```

### Refresh state:
```powershell
terraform refresh
```

### Validar configuração:
```powershell
terraform validate
terraform fmt
```

### Ver plano sem aplicar:
```powershell
terraform plan
```

---

## 📝 CHECKLIST PÓS-DEPLOY

- [ ] Frontend acessível via HTTP
- [ ] Nginx rodando no frontend
- [ ] Load Balancer respondendo
- [ ] Ambos backends respondendo (round-robin)
- [ ] MySQL aceitando conexões
- [ ] Database `safestock` criado
- [ ] Tabelas criadas no database
- [ ] Logs sem erros críticos
- [ ] Health checks passando

---

## 🔗 URLS IMPORTANTES

- **Frontend**: `http://<FRONTEND_IP>`
- **Load Balancer**: `http://<LOAD_BALANCER_IP>`
- **Backend 01**: `http://<BACKEND_01_PRIVATE_IP>:8080` (via VPC)
- **Backend 02**: `http://<BACKEND_02_PRIVATE_IP>:8080` (via VPC)
- **MySQL**: `<DATABASE_PRIVATE_IP>:3306` (via VPC)

---

## 📞 PRÓXIMOS PASSOS

1. ✅ Aplicar terraform
2. ✅ Monitorar logs
3. ✅ Testar endpoints
4. ✅ Verificar conectividade entre serviços
5. ✅ Popular database com dados iniciais
6. ✅ Configurar domínio/DNS (opcional)
