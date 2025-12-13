
# Configurações Gerais
variable "aws_region" {
  description = "Região AWS para deploy da infraestrutura SafeStock"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nome do projeto (usado em tags)"
  type        = string
  default     = "SafeStock"
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "prod"
}

# Configurações de Rede
variable "vpc_cidr" {
  description = "CIDR block para a VPC principal"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_public_cidr" {
  description = "CIDR para subnet pública (única)"
  type        = string
  default     = "10.0.1.0/24"
}

# Configurações da Instância EC2 (ÚNICA - ALL-IN-ONE)
variable "instance_type" {
  description = "Tipo de instância EC2 (único servidor com Docker Compose)"
  type        = string
  default     = "t3.large"
}

variable "key_pair_name" {
  description = "Nome da chave SSH para acesso às instâncias"
  type        = string
  default     = "sf-keypair-main"
}

# Configurações do Banco de Dados
variable "mysql_root_password" {
  description = "Senha root do MySQL"
  type        = string
  default     = "SafeStock@2024!"
  sensitive   = true
}

variable "mysql_user" {
  description = "Usuário da aplicação no MySQL"
  type        = string
  default     = "safestock_user"
}

variable "mysql_password" {
  description = "Senha do usuário da aplicação MySQL"
  type        = string
  default     = "SafeStockApp@2024!"
  sensitive   = true
}

variable "rabbitmq_user" {
  description = "Usuário do RabbitMQ"
  type        = string
  default     = "safestock_rabbit"
}

variable "rabbitmq_password" {
  description = "Senha do usuário RabbitMQ"
  type        = string
  default     = "SafeStockRabbit@2024!"
  sensitive   = true
}

# Configurações de Segurança
variable "allowed_ssh_cidr" {
  description = "CIDR blocks permitidos para SSH"
  type        = list(string)
  default     = ["0.0.0.0/0"] # ⚠️ Para produção, restringir ao seu IP
}

variable "allowed_http_cidr" {
  description = "CIDR blocks permitidos para HTTP/HTTPS"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

# Configurações de Volume
variable "root_volume_size" {
  description = "Tamanho em GB do volume raiz (para Docker + dados)"
  type        = number
  default     = 50
}

variable "root_volume_type" {
  description = "Tipo do volume raiz (gp3 é recomendado)"
  type        = string
  default     = "gp3"
}

# Monitoring
variable "enable_monitoring" {
  description = "Habilitar monitoring detalhado da EC2"
  type        = bool
  default     = false
}

# Tags padrão
variable "common_tags" {
  description = "Tags comuns para todos os recursos"
  type        = map(string)
  default = {
    Project     = "SafeStock"
    Environment = "Production"
    ManagedBy   = "Terraform"
    Owner       = "SafeStock-Team"
  }
}

# Configurações de Repositório (FLEXÍVEL)
variable "repository_url" {
  description = "URL do repositório Git (flexível para mudanças futuras)"
  type        = string
  default     = "https://github.com/SafeStock/SafeStock.git"
}

variable "repository_branch" {
  description = "Branch do repositório para deploy"
  type        = string
  default     = "main"
}

# URLs dos repositórios (para flexibilidade futura)
variable "repositories" {
  description = "Repositórios para cada componente (flexível para multirepo)"
  type = object({
    frontend_repo  = string
    backend_repo   = string
    backend_branch = string
  })
  default = {
    # Monorepo atual
    frontend_repo  = "https://github.com/SafeStock/SafeStock.git"
    backend_repo   = "https://github.com/SafeStock/SafeStock.git"
    backend_branch = "main"
  }
}

# ================================================
# DOMÍNIO E DNS
# ================================================

variable "domain_name" {
  description = "Nome do domínio para a aplicação SafeStock (opcional)"
  type        = string
  default     = "" # Deixe vazio para usar apenas IPs
}