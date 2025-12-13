# SafeStock - Infraestrutura Terraform (Versão Simplificada)

## 📋 Resumo da Arquitetura

**Single EC2 All-In-One com Docker Compose** - Ideal para labs de estudante e testes.

```
┌─────────────────────────────────────────────────────────┐
│                    AWS EC2 (t3.large)                   │
│                    50GB SSD (gp3)                       │
├─────────────────────────────────────────────────────────┤
│  Docker Compose Services:                               │
│  ├─ Nginx (Frontend React + Load Balancer)             │
│  ├─ Spring Boot Backend #1 (port 8080)                 │
│  ├─ Spring Boot Backend #2 (port 8080)                 │
│  ├─ MySQL 8.0 (port 3306)                              │
│  ├─ RabbitMQ (port 5672)                               │
│  └─ Redis (port 6379)                                  │
└─────────────────────────────────────────────────────────┘
       │
       └─ Elastic IP (endereço IP público estático)
       └─ Security Group (SSH, HTTP, HTTPS, egress livre)
       └─ VPC: 10.0.0.0/16
       └─ Subnet Pública: 10.0.1.0/24
```

## 🎯 Características

✅ **Single EC2** - Tudo em uma instância (t3.large / t3.medium)
✅ **Docker Compose** - Orquestração simplificada  
✅ **Sem IAM Roles** - Compatível com AWS Academy/Labs de estudante
✅ **50GB Storage** - Espaço amplo para evitar problemas
✅ **Elastic IP** - IP público estático
✅ **Fully Automated** - User-data script faz todo setup

## 📦 Componentes Terraform

### Recursos Criados

```hcl
# Networking
- aws_vpc.safestock_vpc              # VPC 10.0.0.0/16
- aws_subnet.safestock_subnet_public # Subnet pública
- aws_internet_gateway.safestock_igw # Internet Gateway
- aws_route_table.*                  # Roteamento

# Segurança
- aws_security_group.safestock_sg    # Unified SG
- aws_vpc_security_group_ingress_rule.* # SSH, HTTP, HTTPS
- aws_vpc_security_group_egress_rule.*  # All outbound

# Compute
- aws_instance.safestock_ec2         # EC2 Instance
- aws_network_interface.safestock_eni # ENI

# IP Público
- aws_eip.safestock_eip              # Elastic IP
- aws_eip_association.safestock_eip_assoc
```

## 🚀 Como Usar

### 1. Preparar Chaves SSH

```bash
cd terraform/ssh-keys/
# Gerar chave (se não existir)
ssh-keygen -t rsa -b 4096 -f safestock-keypair -N ""
```

### 2. Configurar Variáveis

Edit `terraform.tfvars`:
```hcl
aws_region       = "us-east-1"
instance_type    = "t3.large"    # ou "t3.medium"
root_volume_size = 50             # GB
key_pair_name    = "safestock-keypair"
```

### 3. Deploy com Terraform

```bash
cd terraform

# Validar
terraform init
terraform plan

# Aplicar
terraform apply

# Obter outputs (IPs, URLs, SSH command)
terraform output
```

### 4. Acessar Aplicação

Após 5-10 minutos (esperar user-data completar):

```
Frontend: http://{ELASTIC_IP}
API: http://{ELASTIC_IP}:8081/api
```

### 5. SSH na Instância

```bash
ssh -i terraform/ssh-keys/safestock-keypair.pem ec2-user@{ELASTIC_IP}

# Verificar containers
docker ps -a
docker compose logs -f
```

## ⚙️ Customizações

### Instance Type
- **t3.medium**: Funciona, mas mais ajustado (requer monitoramento)
- **t3.large**: Recomendado (mais espaço em RAM)

### Storage
Aumentar em `terraform.tfvars`:
```hcl
root_volume_size = 100  # 100GB ao invés de 50GB
```

### Senhas de Banco/Fila
Em `terraform.tfvars`, customizar:
```hcl
mysql_root_password = "SuaSenhaForte@123"
mysql_password      = "OutraSenha@456"
rabbitmq_password   = "RabbitSenha@789"
```

## 📊 Pricing (AWS Free Tier Considerations)

| Recurso | Estimado |
|---------|----------|
| EC2 t3.large | ~$0.10/hora |
| Elastic IP (quando alocado) | Grátis se associado |
| Storage (50GB) | ~$5/mês |
| Data transfer (outbound) | ~$0.09/GB |

**⚠️ Nota**: AWS Academy tem créditos; verificar saldo antes de fazer deploy.

## 🔒 Segurança para Labs

A configuração está otimizada para labs:
- ✅ Sem IAM roles complexas (compatível com restrições de lab)
- ✅ Security group simples (SSH, HTTP, HTTPS, egress)
- ✅ Sem KMS encryption obrigatória
- ✅ Sem CloudWatch expensive features
- ✅ Sem RDS (database em Docker)

## 🆘 Troubleshooting

### Containers não iniciavam
```bash
# SSH na instância
ssh -i ssh-keys/safestock-keypair.pem ec2-user@{IP}

# Ver user-data logs
tail -f /var/log/cloud-init-output.log

# Ver docker compose status
cd safestock
docker compose ps
docker compose logs
```

### Erro ao conectar na aplicação
```bash
# Verificar Security Group
terraform output

# Verificar se ports estão abertas
sudo netstat -tlnp | grep -E "80|443|8080|3306"

# Verificar containers
docker ps
```

### Espaço em disco lotado
```bash
# Ver espaço
df -h

# Limpar docker (cuidado!)
docker system prune -a
```

## 📝 Variáveis Terraform

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `aws_region` | us-east-1 | Região AWS |
| `instance_type` | t3.large | Tipo EC2 |
| `root_volume_size` | 50 | GB de storage |
| `root_volume_type` | gp3 | Tipo volume |
| `key_pair_name` | safestock-keypair | Nome da chave SSH |
| `enable_monitoring` | false | CloudWatch detailed |
| `allowed_ssh_cidr` | 0.0.0.0/0 | CIDR SSH |
| `allowed_http_cidr` | 0.0.0.0/0 | CIDR HTTP |

## 🎓 Para Estudantes

Esta arquitetura é ideal para:
- ✅ Aprender AWS + Docker + Terraform
- ✅ Testar aplicações completas
- ✅ Apresentações e demos
- ✅ Projetos acadêmicos
- ✅ AWS Academy labs

**Mantém tudo simples** - sem complexidades de produção (multi-AZ, auto-scaling, RDS, etc).

## 📚 Próximos Passos

Para produção, evoluir para:
1. Separar serviços (não tudo em um EC2)
2. Usar RDS para MySQL
3. Usar ElastiCache para Redis
4. Auto Scaling Groups
5. Application Load Balancer
6. CloudFormation ou Pulumi

Mas por enquanto, **single EC2 + Docker Compose é perfeito para labs!** 🚀
