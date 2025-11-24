# ================================================================
# SAFESTOCK TERRAFORM VARIABLES 
# ================================================================
#

# AWS Configuration
aws_region = "us-east-1"

# Project Configuration
project_name = "SafeStock"
environment  = "prod"

# Repository Configuration (FLEXÍVEL para mudanças futuras)
repository_url    = "https://github.com/SafeStock/SafeStock.git"
repository_branch = "main"

# Para futuro multirepo (descomente quando necessário)
# repositories = {
#   frontend_repo  = "https://github.com/SafeStock/SafeStock.git"
#   backend_repo   = "https://github.com/SafeStock/Project-SafeStock-BackEnd"  
#   backend_branch = "main"
# }

# Network Configuration
vpc_cidr                     = "10.0.0.0/16"
subnet_publica_frontend_cidr = "10.0.1.0/24"
subnet_publica_lb_cidr       = "10.0.2.0/24"
subnet_privada_backend_cidr  = "10.0.10.0/24"
subnet_privada_database_cidr = "10.0.20.0/24"

# EC2 Configuration
instance_type_frontend = "t3.medium"
instance_type_backend  = "t3.small"
instance_type_database = "t3.small"

# Security Configuration
key_pair_name     = "sf-keypair-main"
allowed_ssh_cidr  = ["0.0.0.0/0"]
allowed_http_cidr = ["0.0.0.0/0"]

# Database Configuration
mysql_root_password = "safestock123" # Senha padrão para testes
mysql_app_password  = "safestock123"

# Availability Zones (ajustar conforme região)
availability_zones = ["us-east-1a", "us-east-1b"]

# Tags personalizadas (opcional)
common_tags = {
  Project     = "SafeStock"
  Environment = "Production"
  ManagedBy   = "Terraform"
  Owner       = "SafeStock-Team"
  University  = "SPTech"
  Course      = "ADS"
}