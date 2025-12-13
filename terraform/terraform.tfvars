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
vpc_cidr            = "10.0.0.0/16"
subnet_public_cidr  = "10.0.1.0/24"

# EC2 Configuration (ÚNICA - ALL-IN-ONE)
instance_type     = "t3.large"
root_volume_size  = 50
root_volume_type  = "gp3"
enable_monitoring = false

# Security Configuration
key_pair_name     = "sf-keypair-main"
allowed_ssh_cidr  = "0.0.0.0/0" 
allowed_http_cidr = "0.0.0.0/0"  

# Database Configuration
mysql_root_password = "safestock123"


# Tags personalizadas (opcional)
common_tags = {
  Project     = "SafeStock"
  Environment = "Production"
  ManagedBy   = "Terraform"
  Owner       = "SafeStock-Team"
  University  = "SPTech"
  Course      = "ADS"
}