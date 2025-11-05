# 🚀 SafeStock - Guia Rápido de Acesso SSH

## 📋 Após o `terraform apply` completar:

### 1️⃣ **Ver IPs e Comandos SSH:**
```powershell
cd terraform
terraform output
```

### 2️⃣ **Acessar Frontend (Amazon Linux 2):**
```powershell
# Obter comando completo
terraform output ssh_frontend

# Ou manualmente:
ssh -i ssh-keys\sf-keypair-prod.pem ec2-user@<FRONTEND_IP>
```

### 3️⃣ **Testar Frontend no Navegador:**
```powershell
# Obter URL
terraform output frontend_url_by_ip

# Exemplo: http://54.123.45.67
```

### 4️⃣ **Ver Logs do Frontend:**
```bash
# Após conectar via SSH
sudo tail -100 /var/log/user-data.log
sudo systemctl status nginx
sudo journalctl -u nginx -n 50
```

### 5️⃣ **Ver Logs do Database (via Load Balancer como jump host):**
```bash
# Primeiro, conectar no Load Balancer
terraform output load_balancer_public_ip
ssh -i ssh-keys\sf-keypair-prod.pem ec2-user@<LB_IP>

# Depois, do Load Balancer, conectar no database
ssh ec2-user@<DATABASE_PRIVATE_IP>
sudo tail -100 /var/log/user-data.log
sudo systemctl status mysqld
```

### 6️⃣ **Testar API Backend:**
```powershell
# Obter URL da API
terraform output backend_api_url_by_ip

# Testar
curl http://<LOAD_BALANCER_IP>/api/health
```

---

## 🔑 **Localização das Chaves SSH:**
- **Privada**: `terraform/ssh-keys/sf-keypair-prod.pem`
- **Pública**: `terraform/ssh-keys/sf-keypair-prod.pub`

⚠️ **NUNCA commite a chave privada `.pem` no Git!**

---

## 🐛 **Troubleshooting Rápido:**

### Frontend não responde?
```bash
ssh -i ssh-keys\sf-keypair-prod.pem ec2-user@<FRONTEND_IP>
sudo systemctl status nginx
sudo tail -50 /var/log/user-data.log
```

### Database não conecta?
```bash
# Via Load Balancer como jump host
ssh -i ssh-keys\sf-keypair-prod.pem ec2-user@<LB_IP>
ssh ec2-user@<DATABASE_PRIVATE_IP>
sudo systemctl status mysqld
sudo tail -100 /var/log/user-data.log | grep -i mysql
```

### Backend não inicia?
```bash
# Via Load Balancer
ssh -i ssh-keys\sf-keypair-prod.pem ec2-user@<LB_IP>
ssh ec2-user@<BACKEND_IP>
sudo systemctl status safestock-backend
sudo tail -100 /var/log/user-data.log | grep -i spring
```

---

**Gerado em**: 2025-11-05  
**Terraform Version**: 1.x  
**Região AWS**: us-east-1
