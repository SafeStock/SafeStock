
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

variable "subnet_publica_frontend_cidr" {
  description = "CIDR para subnet pública do frontend"
  type        = string
  default     = "10.0.1.0/24"
}

variable "subnet_publica_lb_cidr" {
  description = "CIDR para subnet pública do load balancer"
  type        = string
  default     = "10.0.2.0/24"
}

variable "subnet_privada_backend_cidr" {
  description = "CIDR para subnet privada do backend"
  type        = string
  default     = "10.0.10.0/24"
}

variable "subnet_privada_database_cidr" {
  description = "CIDR para subnet privada do database"
  type        = string
  default     = "10.0.20.0/24"
}

# Configurações das Instâncias EC2
variable "instance_type_frontend" {
  description = "Tipo de instância para frontend (Nginx + React)"
  type        = string
  default     = "t3.micro"
}

variable "instance_type_backend" {
  description = "Tipo de instância para backend (Spring Boot)"
  type        = string
  default     = "t3.small"
}

variable "instance_type_database" {
  description = "Tipo de instância para database (MySQL)"
  type        = string
  default     = "t3.small"
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

variable "mysql_app_password" {
  description = "Senha do usuário da aplicação MySQL"
  type        = string
  default     = "SafeStockApp@2024!"
  sensitive   = true
}

# Configurações de Segurança
variable "allowed_ssh_cidr" {
  description = "CIDR blocks permitidos para SSH"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # ⚠️ Para produção, restringir ao seu IP
}

variable "allowed_http_cidr" {
  description = "CIDR blocks permitidos para HTTP/HTTPS"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

# Availability Zones
variable "availability_zones" {
  description = "AZs para distribuir os recursos"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
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