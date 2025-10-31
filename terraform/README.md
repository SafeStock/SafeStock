# 🚀 SafeStock AWS Infrastructure

Infraestrutura completa do SafeStock na AWS usando Terraform, com arquitetura distribuída e escalável.

## 🏗️ Arquitetura

```
🌐 Internet
    │
    ├── 🏢 sf-vpc-principal (10.0.0.0/16)
    │   │
    │   ├── 📡 Subnets Públicas
    │   │   ├── sf-subnet-publica-frontend (10.0.1.0/24)
    │   │   │   └── 🖥️ Frontend EC2 (Nginx + React) + EIP
    │   │   │
    │   │   └── sf-subnet-publica-lb (10.0.2.0/24)
    │   │       └── ⚖️ Application Load Balancer
    │   │
    │   └── 🔒 Subnets Privadas
    │       ├── sf-subnet-privada-backend (10.0.10.0/24)
    │       │   ├── 🔧 Backend EC2 #1 (Spring Boot) + EIP
    │       │   └── 🔧 Backend EC2 #2 (Spring Boot) + EIP
    │       │
    │       └── sf-subnet-privada-database (10.0.20.0/24)
    │           └── 🗄️ MySQL EC2 + EIP
```

## 📋 Recursos Criados

### 🌐 Rede
- **VPC**: sf-vpc-principal
- **Subnets**: 2 públicas + 2 privadas
- **Internet Gateway**: sf-igw-acesso-publico
- **NAT Gateway**: sf-nat-gateway-privadas
- **Route Tables**: configuração completa

### 🖥️ Instâncias EC2
- **Frontend**: 1x t3.micro (Nginx + React)
- **Backend**: 2x t3.small (Spring Boot + Load Balance)
- **Database**: 1x t3.small (MySQL)
- **Elastic IPs**: 5 EIPs (1 para NAT + 4 para instâncias)

### ⚖️ Load Balancer
- **ALB**: sf-alb-backend-distribuidor
- **Target Group**: sf-tg-backend-spring
- **Health Check**: /actuator/health

### 🛡️ Security Groups
- **Frontend**: HTTP/HTTPS + SSH
- **Backend**: 8080 (from ALB) + SSH
- **Database**: 3306 (from Backend) + SSH
- **ALB**: HTTP/HTTPS público

## 🚀 Deploy Rápido

### 1️⃣ Pré-requisitos
```bash
# Instalar Terraform
# Instalar AWS CLI
# Configurar credenciais AWS
aws configure
```

### 2️⃣ Deploy Automático
```bash
cd terraform
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### 3️⃣ Opção Manual
```bash
# 1. Inicializar Terraform
terraform init

# 2. Planejar deployment
terraform plan

# 3. Aplicar infraestrutura
terraform apply

# 4. Ver outputs
terraform output
```

## 🔧 Configuração

### 📄 terraform.tfvars
```hcl
# AWS Configuration
aws_region = "us-east-1"

# Project Configuration  
project_name = "SafeStock"
environment = "prod"

# Repository Configuration (FLEXÍVEL)
repository_url = "https://github.com/SafeStock/SafeStock.git"

# Instance Types
instance_type_frontend = "t3.micro"
instance_type_backend = "t3.small" 
instance_type_database = "t3.small"

# Database Passwords
mysql_root_password = "SafeStock@Root2024!"
mysql_app_password = "safestock123"
```

### 🔄 Repositórios Flexíveis
```hcl
# Para mudança futura para multirepo
repositories = {
  frontend_repo  = "https://github.com/SafeStock/SafeStock.git"
  backend_repo   = "https://github.com/SafeStock/safestock-backend.git"
  backend_branch = "main"
}
```

## 🔄 Atualizações da Aplicação

### 🛠️ Script Automático
```bash
cd terraform
chmod +x scripts/update-apps.sh
./scripts/update-apps.sh
```

### 🎯 Atualizações Manuais
```bash
# Frontend
ssh ubuntu@FRONTEND_IP
sudo /opt/update-frontend.sh

# Backend  
ssh ubuntu@BACKEND_IP
sudo /opt/update-backend.sh

# Database Backup
ssh ubuntu@DATABASE_IP
sudo /opt/mysql-backup.sh
```

## 📊 Monitoramento

### 🔍 Status dos Serviços
```bash
# Via script
./scripts/update-apps.sh  # Opção 4

# Manual
ssh ubuntu@IP "sudo systemctl status SERVICE_NAME"
```

### 📋 Logs
```bash
# Frontend (Nginx)
ssh ubuntu@FRONTEND_IP "sudo journalctl -u nginx -f"

# Backend (Spring Boot)
ssh ubuntu@BACKEND_IP "sudo journalctl -u safestock-backend -f"

# Database (MySQL)  
ssh ubuntu@DATABASE_IP "sudo journalctl -u mysql -f"
```

### 🎯 Health Checks
```bash
# Backend Health
curl http://ALB_DNS/actuator/health

# Frontend 
curl http://FRONTEND_IP

# MySQL Connection
ssh ubuntu@DATABASE_IP "mysql -u safestock -p -e 'SELECT 1'"
```

## 🔐 Acesso SSH

### 🗝️ Chave SSH
A chave SSH `sf-keypair-main` é criada automaticamente em `~/.ssh/`

### 📡 Conexões
```bash
# Frontend
ssh -i ~/.ssh/sf-keypair-main ubuntu@FRONTEND_IP

# Backend 01
ssh -i ~/.ssh/sf-keypair-main ubuntu@BACKEND_01_IP

# Backend 02  
ssh -i ~/.ssh/sf-keypair-main ubuntu@BACKEND_02_IP

# Database
ssh -i ~/.ssh/sf-keypair-main ubuntu@DATABASE_IP
```

## 🗄️ Banco de Dados

### 🔧 Configuração Automática
- **Banco**: `safestock`
- **Usuário**: `safestock` 
- **JPA**: Criação automática de tabelas
- **Dados**: Inserção via `data.sql`

### 💾 Backups Automáticos
- **Frequência**: Diário às 2h
- **Retenção**: 7 dias
- **Local**: `/opt/mysql-backups/`

### 🔗 String de Conexão
```properties
spring.datasource.url=jdbc:mysql://DATABASE_PRIVATE_IP:3306/safestock
spring.datasource.username=safestock
spring.datasource.password=safestock123
```

## 🌐 URLs da Aplicação

Após o deploy, você terá:

- **🖥️ Frontend**: `http://FRONTEND_EIP`
- **🔗 API (Load Balancer)**: `http://ALB_DNS/api` 
- **📊 Backend Health**: `http://ALB_DNS/actuator/health`

## 📱 Profiles Spring Boot

### 🛠️ Desenvolvimento (Local)
```bash
# Usa H2 + application.properties
java -jar safestock.jar
```

### 🚀 Produção (AWS) 
```bash
# Usa MySQL + application-prod.properties
java -jar -Dspring.profiles.active=prod safestock.jar
```

## 🔧 Troubleshooting

### ❌ Problemas Comuns

**1. Backend não conecta no MySQL**
```bash
# Verificar se MySQL está rodando
ssh ubuntu@DATABASE_IP "sudo systemctl status mysql"

# Testar conectividade
ssh ubuntu@BACKEND_IP "telnet DATABASE_PRIVATE_IP 3306"
```

**2. Load Balancer retorna 502**
```bash  
# Verificar health do backend
curl http://BACKEND_IP:8080/actuator/health

# Ver logs do Spring Boot
ssh ubuntu@BACKEND_IP "sudo journalctl -u safestock-backend -f"
```

**3. Frontend não carrega**
```bash
# Verificar Nginx
ssh ubuntu@FRONTEND_IP "sudo systemctl status nginx"

# Ver logs do Nginx
ssh ubuntu@FRONTEND_IP "sudo tail -f /var/log/nginx/error.log"
```

## 💰 Custos Estimados (us-east-1)

- **4x EC2**: ~$50-80/mês
- **5x Elastic IP**: ~$25/mês  
- **1x ALB**: ~$20/mês
- **1x NAT Gateway**: ~$45/mês
- **Total**: ~$140-170/mês

## 🔄 Destruir Infraestrutura

```bash
# Via script
./scripts/deploy.sh  # Opção 4

# Manual
terraform destroy
```

## 📚 Estrutura de Arquivos

```
terraform/
├── main.tf                    # Infraestrutura principal
├── variables.tf              # Variáveis configuráveis  
├── outputs.tf               # Outputs importantes
├── terraform.tfvars         # Valores das variáveis
├── user-data/              # Scripts de inicialização
│   ├── frontend-user-data.sh
│   ├── backend-user-data.sh
│   └── database-user-data.sh
└── scripts/               # Scripts de automação
    ├── deploy.sh         # Deploy da infraestrutura
    └── update-apps.sh   # Atualização das aplicações
```

## 🆘 Suporte

- **📖 Documentação**: Este README
- **🐛 Issues**: GitHub Issues
- **💬 Discussões**: GitHub Discussions
- **📧 Contato**: Equipe SafeStock

---

**🏗️ Desenvolvido com Terraform + AWS pela equipe SafeStock**