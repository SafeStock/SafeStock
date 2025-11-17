# 🔐 SSH Keys - SafeStock Infrastructure

Este diretório contém as chaves SSH geradas automaticamente pelo Terraform para acessar as instâncias EC2.

## 📁 Arquivos Gerados

- `sf-keypair-prod.pem` - **Chave privada** (NUNCA compartilhe ou commit!)
- `sf-keypair-prod.pub` - **Chave pública** (para referência)

## 🚀 Como Usar

### Windows (PowerShell):
```powershell
# Acessar frontend
ssh -i ssh-keys\sf-keypair-prod.pem ec2-user@<FRONTEND_IP>

# Copiar arquivo para instância
scp -i ssh-keys\sf-keypair-prod.pem arquivo.txt ec2-user@<IP>:/home/ec2-user/
```

### Linux/Mac:
```bash
# Ajustar permissões (primeira vez)
chmod 600 ssh-keys/sf-keypair-prod.pem

# Acessar frontend
ssh -i ssh-keys/sf-keypair-prod.pem ec2-user@<FRONTEND_IP>
```

## 🔒 Segurança

⚠️ **IMPORTANTE:**
- A chave privada `.pem` **NUNCA** deve ser commitada no Git
- O `.gitignore` já está configurado para proteger estes arquivos
- Mantenha as chaves em local seguro
- Use `chmod 600` em Linux/Mac para permissões corretas

## 🔄 Regenerar Chaves

Para regenerar as chaves:

```bash
# Destruir infraestrutura atual
terraform destroy -auto-approve

# Remover chaves antigas
rm -rf ssh-keys/*.pem ssh-keys/*.pub

# Recriar infraestrutura (gera novas chaves)
terraform apply -auto-approve
```

## 📋 IPs das Instâncias

Após o `terraform apply`, consulte os IPs com:

```bash
terraform output frontend_public_ip
terraform output ssh_frontend
```

---

**Gerado automaticamente pelo Terraform** 🤖
