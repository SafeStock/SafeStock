# � SafeStock - Arquivos Terraform

Explicação breve de cada arquivo na pasta terraform.

## 📋 Arquivos Principais

### **`main.tf`**
- Infraestrutura completa da AWS (VPC, EC2s, Security Groups, Load Balancer)
- Cria 5 EC2s: 1 frontend, 1 load balancer, 2 backends, 1 database
- Define toda a rede (subnets públicas/privadas, internet gateway, etc.)

### **`variables.tf`** 
- Define todas as variáveis configuráveis (região, tipos de instância, senhas)
- Permite personalizar a infraestrutura sem editar o main.tf

### **`outputs.tf`**
- Mostra informações importantes após o deploy (IPs, URLs, conexões SSH)
- Exibe as URLs do frontend e API para acessar a aplicação

### **`terraform.tfvars`**
- Seus valores pessoais (região AWS, senhas do MySQL, etc.)
- Arquivo que você edita com suas configurações específicas


## 🤖 Scripts de Automação

### **`user-data/`** - Scripts que configuram cada EC2 automaticamente
- **`frontend-user-data.sh`** - Instala Nginx, clona repo, faz build do React e configura servidor
- **`backend-user-data.sh`** - Instala Java, Maven, clona repo, compila Spring Boot e cria serviço
- **`database-user-data.sh`** - Instala MySQL, cria banco `safestock` e usuário para a aplicação  
- **`loadbalancer-user-data.sh`** - Instala Nginx como load balancer para distribuir entre backends

### **`scripts/`** - Scripts auxiliares de gerenciamento
- **`deploy.sh`** - Automação completa do deploy (init, plan, apply)
- **`validate.sh`** - Validações e checagens antes do deploy
- **`update-apps.sh`** - Atualizar aplicações sem recriar a infraestrutura

## ⚙️ Arquivos de Estado (Não mexer!)

### **`.terraform/`** - Cache e plugins do Terraform (gerado automaticamente)
### **`.terraform.lock.hcl`** - Lock das versões dos providers AWS (gerado automaticamente)  
### **`terraform.tfstate`** - Estado atual da infraestrutura (CRÍTICO! Backup automático)
### **`terraform.tfstate.backup`** - Backup do estado anterior (segurança)
### **`terraform.tfvars.save`** - Backup das suas configurações

## 🚀 Como Usar
```bash
terraform init && terraform validate && terraform plan && terraform apply
```

### **2. Aguardar inicialização (5-10 minutos)**
Os user-data scripts vão configurar automaticamente todas as aplicações.

### **3. Acessar a aplicação:**

## 🌐 **URLs DE ACESSO (Após o Deploy)**

### **🖥️ FRONTEND SAFESTOCK:**
```
http://52.201.128.168
```
*Este IP é mostrado no output `frontend_url` após o terraform apply*

### **🔗 API BACKEND:**  
```
http://107.20.11.120/api
```
*Este IP é mostrado no output `backend_api_url` após o terraform apply*

### **📊 MONITORAMENTO:**
- **Health Check Load Balancer**: `http://107.20.11.120/health`
- **API Backend**: `http://107.20.11.120/api`

## 🎯 **EXEMPLO REAL DE ACESSO**

### **Após executar `terraform apply`, você verá:**
```bash
Apply complete! Resources: 25 added, 0 changed, 0 destroyed.

Outputs:
frontend_url = "http://52.201.128.168"
backend_api_url = "http://107.20.11.120/api"  
load_balancer_url = "http://107.20.11.120"
```

### **✅ Então acesse:**
- **🌐 SafeStock App**: **http://52.201.128.168** ← **URL PRINCIPAL DO FRONTEND**
- **🔗 API REST**: http://107.20.11.120/api
- **📊 Health Check**: http://107.20.11.120/health

### **⏱️ Cronograma:**
1. **Deploy Terraform**: 5-8 minutos ⏳
2. **Configuração automática EC2s**: 5-10 minutos ⚙️ 
3. **✅ Aplicação disponível**: ~15 minutos total
