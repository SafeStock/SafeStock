# 🏗️ Arquitetura AWS - SafeStock# 🚀 DEPLOY AWS - WORKFLOW COMPLETO



## 📋 Arquitetura Proposta## 📝 RESUMO EXECUTIVO



### **Subnet Pública (DMZ)**Este documento descreve o workflow automatizado de deploy na AWS.

- ✅ **Frontend (Nginx)** - EC2 ou S3 + CloudFront

- ✅ **Load Balancer / Reverse Proxy** - Application Load Balancer (ALB) ou Nginx---

  - Distribui tráfego entre os 2 backends

  - SSL/TLS termination## 🎯 WORKFLOW AUTOMÁTICO

  - Health checks

### 1️⃣ Deploy da Infraestrutura

### **Subnet Privada (Backend)**```bash

- ✅ **Backend A (Primary)** - EC2 port 8081cd terraform

- ✅ **Backend B (Secondary)** - EC2 port 8082./scripts/deploy.sh

- ✅ **MySQL Database** - RDS MySQL 8.0```

- ✅ **RabbitMQ** - Amazon MQ for RabbitMQ ou EC2- Cria toda a infraestrutura AWS (VPC, EC2, Security Groups, etc.)

- Provisiona 4 servidores (Frontend, 2 Backends, Database)

---- Gera outputs com IPs públicos



## 🎯 Análise da Arquitetura### 2️⃣ Configuração Automática de Ambiente

```bash

### ✅ **PONTOS FORTES**cd terraform/scripts

chmod +x configure-env.sh

1. **Isolamento de Rede**./configure-env.sh

   - Backend e banco na subnet privada = ✅ Segurança```

   - Apenas Load Balancer exposto publicamente**O que faz automaticamente:**

- ✅ Pega IP público da EC2 do Terraform

2. **Alta Disponibilidade**- ✅ Atualiza `.env.aws` → `AWS_EC2_IP=54.x.x.x`

   - 2 instâncias de backend (A e B)- ✅ Atualiza `.env.production` → `VITE_API_BASE_URL=http://54.x.x.x:8081`

   - Load balancer distribui carga- ✅ Configura CORS do backend para aceitar o IP público

   - Se um backend cair, outro continua

### 3️⃣ Commit e Push

3. **Escalabilidade**```bash

   - Fácil adicionar mais backends no ALBcd ..  # volta para SafeStock/

   - RDS pode escalar verticalmentegit add .env.aws Front-end/Plataforma/.env.production

git commit -m "Configure AWS environment for deployment"

### ⚠️ **RECOMENDAÇÕES IMPORTANTES**git push origin main

```

#### 1. **Não coloque Frontend na mesma EC2 do Load Balancer!**

### 4️⃣ Atualizar Aplicações nos Servidores

**Opção A: Frontend em S3 + CloudFront (RECOMENDADO)**```bash

```cd terraform/scripts

Usuário → CloudFront (CDN) → S3 (arquivos estáticos)./update-apps.sh

         ↓ (API calls)```

         ALB → Backend (subnet privada)Escolha opção **3** (Frontend + Backend)

```

**Vantagens:**---

- 🚀 Muito mais rápido (CDN global)

- 💰 Mais barato que EC2## 🏗️ ESTRUTURA DE ARQUIVOS

- 📈 Escala automaticamente

- 🔒 HTTPS grátis via Certificate Manager```

- 💾 Sem necessidade de gerenciar servidorSafeStock/

├── .env.aws                              # ← Configurado automaticamente

**Opção B: Frontend em EC2 separada**│   └── AWS_EC2_IP=54.x.x.x

```│

Frontend EC2 (Nginx) → ALB → Backend EC2s├── Front-end/Plataforma/

```│   ├── .env.development                   # Dev local (localhost)

**Desvantagens:**│   └── .env.production                    # ← Configurado automaticamente

- 💸 Custo adicional de EC2│       └── VITE_API_BASE_URL=http://54.x.x.x:8081

- 🔧 Manutenção de servidor│

- 🐌 Sem CDN (usuários longe sofrem latência)├── Back-end/

│   └── SecurityConfiguracao.java          # ← Usa FRONTEND_URL do docker-compose

#### 2. **Load Balancer / Reverse Proxy**│       └── getOrDefault("FRONTEND_URL", "localhost:5173")

│

**RECOMENDADO: Application Load Balancer (ALB)**├── docker-compose.yml                     # Config base (dev local)

```└── docker-compose.aws.yml                 # Override AWS

Internet Gateway    └── FRONTEND_URL=http://${AWS_EC2_IP}:5173

   ↓```

Application Load Balancer (Subnet Pública)

   ↓ (Target Group)---

   ├─→ Backend A (Subnet Privada)

   └─→ Backend B (Subnet Privada)## 🔑 VARIÁVEIS DE AMBIENTE

```

### Local (Desenvolvimento)

**Configuração ALB:**```bash

- **Listener:** HTTP:80 e HTTPS:443docker compose --profile antigo up -d

- **Target Group:** Backend A (8081) + Backend B (8082)```

- **Health Check:** `GET /actuator/health` ou `/api/funcionarios`- Backend: `FRONTEND_URL` → **localhost:5173** (default)

- **Stickiness:** Session cookie para manter usuário no mesmo backend- Frontend: `.env.development` → **localhost:8081**



**Alternativa: Nginx Reverse Proxy**### AWS (Produção)

- Mais barato (roda em EC2 pequena)```bash

- Mais controle, mas precisa gerenciardocker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws up -d

```

#### 3. **Banco de Dados**- Backend: `FRONTEND_URL` → **http://54.x.x.x:5173** (de .env.aws)

- Frontend: `.env.production` → **http://54.x.x.x:8081**

**RECOMENDADO: Amazon RDS MySQL**

- ✅ Backups automáticos---

- ✅ Multi-AZ para alta disponibilidade

- ✅ Read replicas se precisar escalar leitura## ✅ CHECKLIST DE DEPLOY

- ✅ Gerenciamento automático de patches

- [ ] 1. Rodar `deploy.sh` (cria infraestrutura)

**Configuração RDS:**- [ ] 2. Rodar `configure-env.sh` (configura IPs automaticamente)

```- [ ] 3. Fazer commit e push das configurações

Instance: db.t3.micro ou db.t3.small- [ ] 4. Rodar `update-apps.sh` → Opção 3

Storage: 20 GB SSD (gp3)- [ ] 5. Aguardar 2-3 minutos

Backup: 7 dias- [ ] 6. Acessar `http://IP_FRONTEND:5173`

Multi-AZ: Sim (produção) / Não (dev)

```---



#### 4. **RabbitMQ**## 🎓 PARA SUA EQUIPE



**Opção A: Amazon MQ for RabbitMQ (RECOMENDADO)****Zero configuração manual necessária!**

- ✅ Gerenciado pela AWS

- ✅ Alta disponibilidade automática### Para desenvolvimento local:

- ✅ Backups automáticos```bash

docker compose --profile antigo up -d

**Opção B: RabbitMQ em EC2**```

- Mais barato

- Mais controle, mas precisa gerenciar### Para deploy AWS:

```bash

---# 1. Deploy infraestrutura

cd terraform && ./scripts/deploy.sh

## 🚀 Arquitetura Recomendada Final

# 2. Configurar ambiente (AUTOMÁTICO)

```./scripts/configure-env.sh

┌─────────────────────────────────────────────────────────┐

│                    Internet Gateway                      │# 3. Commit

└─────────────────┬───────────────────────────────────────┘cd .. && git add .env.aws Front-end/Plataforma/.env.production

                  │git commit -m "Configure AWS env" && git push

     ┌────────────┴─────────────┐

     │                          │# 4. Atualizar servidores

     v                          vcd terraform/scripts && ./update-apps.sh

┌─────────────┐         ┌──────────────────┐```

│ CloudFront  │         │  Application LB   │

│    (CDN)    │         │  (Subnet Pública) │**Tudo pronto em 4 comandos!** 🚀

│      +      │         │                   │

│ S3 (Assets) │         │  Port 80/443      │---

└──────┬──────┘         └────────┬──────────┘

       │                         │## 🐛 TROUBLESHOOTING

       │ API calls               │

       └─────────────────────────┘### IPs não foram configurados?

                                 │```bash

                    ┌────────────┴────────────┐cd terraform/scripts

                    │                         │./configure-env.sh

         ┌──────────v──────────┐   ┌─────────v─────────┐```

         │  Backend A (EC2)    │   │  Backend B (EC2)  │

         │  Subnet Privada     │   │  Subnet Privada   │### Aplicação não reflete mudanças?

         │  Spring Boot :8080  │   │  Spring Boot :8080│```bash

         └──────────┬──────────┘   └─────────┬─────────┘cd terraform/scripts

                    │                        │./update-apps.sh  # Opção 3

                    └────────────┬───────────┘```

                                 │

                    ┌────────────v────────────┐### Ver logs:

                    │   RDS MySQL 8.0         │```bash

                    │   Subnet Privada        │cd terraform/scripts

                    │   Multi-AZ              │./update-apps.sh  # Opção 5

                    └─────────────────────────┘```

                                 

                    ┌─────────────────────────┐---

                    │  Amazon MQ RabbitMQ     │

                    │  Subnet Privada         │## 📞 SUPORTE

                    └─────────────────────────┘

```- **Documentação completa:** `terraform/DEPLOY-GUIDE.md`

- **Acesso SSH:** `terraform/GUIA-ACESSO-SSH.md`

---- **Arquitetura:** `ARQUITETURA-AWS.md`


## 🚀 Deploy Workflow Automatizado

### **1️⃣ Deploy da Infraestrutura**
```bash
cd terraform
./scripts/deploy.sh
```
- Cria toda a infraestrutura AWS (VPC, EC2, Security Groups)
- Provisiona 4 servidores (Frontend, 2 Backends, Database)
- Gera outputs com IPs públicos

### **2️⃣ Configuração Automática de Ambiente**
```bash
cd terraform/scripts
chmod +x configure-env.sh
./configure-env.sh
```
**O que faz automaticamente:**
- ✅ Pega IP público da EC2 do Terraform
- ✅ Atualiza `.env.aws` → `AWS_EC2_IP=54.x.x.x`
- ✅ Atualiza `.env.production` → `VITE_API_BASE_URL=http://54.x.x.x:8081`
- ✅ Configura CORS do backend para aceitar o IP público

### **3️⃣ Commit e Push**
```bash
cd ../..  # volta para SafeStock/
git add .env.aws Front-end/Plataforma/.env.production
git commit -m "Configure AWS environment for deployment"
git push origin main
```

### **4️⃣ Atualizar Aplicações nos Servidores**
```bash
cd terraform/scripts
./update-apps.sh
```
Escolha opção **3** (Frontend + Backend)

---

## 🏗️ Estrutura de Arquivos de Deploy

```
SafeStock/
├── .env.aws                              # ← Configurado automaticamente
│   └── AWS_EC2_IP=54.x.x.x
│
├── Front-end/Plataforma/
│   ├── .env.development                   # Dev local (localhost)
│   └── .env.production                    # ← Configurado automaticamente
│       └── VITE_API_BASE_URL=http://54.x.x.x:8081
│
├── Back-end/
│   └── SecurityConfiguracao.java          # ← Usa FRONTEND_URL do docker-compose
│       └── getOrDefault("FRONTEND_URL", "localhost:5173")
│
├── docker-compose.yml                     # Config base (dev local)
└── docker-compose.aws.yml                 # Override AWS
    └── FRONTEND_URL=http://${AWS_EC2_IP}:5173
```

---

## 🔑 Variáveis de Ambiente por Contexto

### **Local (Desenvolvimento)**
```bash
docker compose --profile antigo up -d
```
- Backend: `FRONTEND_URL` → **localhost:5173** (default)
- Frontend: `.env.development` → **localhost:8081**

### **AWS (Produção)**
```bash
docker compose -f docker-compose.yml -f docker-compose.aws.yml --profile antigo --env-file .env.aws up -d
```
- Backend: `FRONTEND_URL` → **http://54.x.x.x:5173** (de .env.aws)
- Frontend: `.env.production` → **http://54.x.x.x:8081**

### **Backend A e B (EC2)**
```bash
# Database
SPRING_DATASOURCE_URL=jdbc:mysql://rds-endpoint.us-east-1.rds.amazonaws.com:3306/safestockDB
SPRING_DATASOURCE_USERNAME=safestock_app
SPRING_DATASOURCE_PASSWORD=<senha-segura-ssm-parameter>

# RabbitMQ
SPRING_RABBITMQ_HOST=<amazon-mq-endpoint>
SPRING_RABBITMQ_PORT=5671  # SSL
SPRING_RABBITMQ_USERNAME=admin
SPRING_RABBITMQ_PASSWORD=<senha-segura-ssm-parameter>
SPRING_RABBITMQ_SSL_ENABLED=true

# JPA
SPRING_JPA_HIBERNATE_DDL_AUTO=validate  # NUNCA use 'update' em produção!
```

### **Load Balancer (ALB)**
```
Listener Rules:
  - Path: /api/*  → Target Group: backends
  - Default: 404 ou redirect para frontend
```

---

## 🔒 Segurança

### **Security Groups**

**ALB Security Group**
```
Inbound:
  - HTTP (80) from 0.0.0.0/0
  - HTTPS (443) from 0.0.0.0/0

Outbound:
  - All traffic to Backend SG
```

**Backend Security Group**
```
Inbound:
  - Port 8080 from ALB SG only
  - SSH (22) from Bastion/VPN only (opcional)

Outbound:
  - MySQL (3306) to RDS SG
  - RabbitMQ (5671) to MQ SG
  - HTTPS (443) to 0.0.0.0/0 (para APIs externas se houver)
```

**RDS Security Group**
```
Inbound:
  - MySQL (3306) from Backend SG only

Outbound:
  - None needed
```

**RabbitMQ Security Group**
```
Inbound:
  - Port 5671 from Backend SG only
  - Management UI (15671) from Bastion/VPN only

Outbound:
  - None needed
```

---

## 💰 Estimativa de Custos (us-east-1)

### **Cenário Básico (Dev/Testing)**
- **ALB:** $22/mês + $0.008/LCU-hour ≈ $25/mês
- **EC2 Backend A+B:** 2x t3.small = 2x $15 = $30/mês
- **RDS MySQL:** db.t3.micro = $15/mês
- **S3 + CloudFront:** $5/mês (tráfego baixo)
- **Amazon MQ:** t3.micro = $35/mês
- **Total:** ~$110/mês

### **Cenário Produção**
- **ALB:** $25/mês
- **EC2 Backend A+B:** 2x t3.medium = 2x $30 = $60/mês
- **RDS MySQL:** db.t3.small Multi-AZ = $50/mês
- **S3 + CloudFront:** $10/mês
- **Amazon MQ:** mq.t3.micro Multi-AZ = $70/mês
- **Total:** ~$215/mês

### **Otimizações de Custo**
1. **Use Reserved Instances:** Economize até 40% em EC2/RDS
2. **Auto Scaling:** Reduza backends fora do horário comercial
3. **S3 Lifecycle Policies:** Mova logs antigos para Glacier
4. **CloudFront:** Reduza custos de transferência

---

## ✅ Checklist de Deploy

- [ ] 1. Rodar `deploy.sh` (cria infraestrutura)
- [ ] 2. Rodar `configure-env.sh` (configura IPs automaticamente)
- [ ] 3. Fazer commit e push das configurações
- [ ] 4. Rodar `update-apps.sh` → Opção 3
- [ ] 5. Aguardar 2-3 minutos
- [ ] 6. Acessar `http://IP_FRONTEND:5173`

---

## 🔧 Monitoramento

### **CloudWatch Alarms**
- ALB 5XX errors > 10/min
- Backend CPU > 80%
- RDS CPU > 80%
- RDS Free Storage < 2GB
- Backend health check failures

### **Logs**
- Application logs → CloudWatch Logs
- ALB access logs → S3
- RDS slow query logs → CloudWatch

---

## 🚨 Considerações Finais

### **NUNCA em Produção:**
1. ❌ `spring.jpa.hibernate.ddl-auto=update` → Use migrations (Flyway/Liquibase)
2. ❌ Senhas hardcoded → Use AWS Systems Manager Parameter Store ou Secrets Manager
3. ❌ HTTP sem HTTPS → Use Certificate Manager + ALB Listener
4. ❌ Root user RDS → Crie usuário específico com permissões mínimas
5. ❌ Mesmo Security Group para tudo → Isole por camada

### **Must Have:**
1. ✅ Backups automáticos (RDS + S3)
2. ✅ Multi-AZ para RDS e RabbitMQ
3. ✅ Auto Scaling Groups para backends
4. ✅ CloudWatch monitoring e alertas
5. ✅ Terraform/CloudFormation para Infrastructure as Code

---

## 🐛 Troubleshooting

### **IPs não foram configurados?**
```bash
cd terraform/scripts
./configure-env.sh
```

### **Aplicação não reflete mudanças?**
```bash
cd terraform/scripts
./update-apps.sh  # Opção 3
```

### **Ver logs:**
```bash
cd terraform/scripts
./update-apps.sh  # Opção 5
```

---

## 📚 Documentação Relacionada

- **Quick Start:** [README.md](./README.md)
- **Deploy Terraform:** [terraform/DEPLOY-GUIDE.md](./terraform/DEPLOY-GUIDE.md)
- **Acesso SSH:** [terraform/GUIA-ACESSO-SSH.md](./terraform/GUIA-ACESSO-SSH.md)
