# ================================================================
# OUTPUTS - INFORMAÇÕES IMPORTANTES APÓS O DEPLOY
# ================================================================

# VPC Information
output "vpc_id" {
  description = "ID da VPC principal"
  value       = aws_vpc.sf_vpc_principal.id
}

output "vpc_cidr" {
  description = "CIDR Block da VPC"
  value       = aws_vpc.sf_vpc_principal.cidr_block
}

# ================================================================
# ELASTIC IPs
# ================================================================

output "frontend_public_ip" {
  description = "IP público do servidor Frontend (Nginx)"
  value       = aws_eip.sf_eip_frontend.public_ip
}

output "backend_01_public_ip" {
  description = "IP público do Backend Server 01 (Spring Boot)"
  value       = aws_eip.sf_eip_backend_01.public_ip
}

output "backend_02_public_ip" {
  description = "IP público do Backend Server 02 (Spring Boot)"
  value       = aws_eip.sf_eip_backend_02.public_ip
}

output "database_public_ip" {
  description = "IP público do servidor MySQL"
  value       = aws_eip.sf_eip_database.public_ip
}

# ================================================================
# LOAD BALANCER
# ================================================================

output "alb_dns_name" {
  description = "DNS público do Application Load Balancer"
  value       = aws_lb.sf_alb_backend_distribuidor.dns_name
}

output "alb_zone_id" {
  description = "Zone ID do ALB (para Route 53 futuramente)"
  value       = aws_lb.sf_alb_backend_distribuidor.zone_id
}

output "alb_url" {
  description = "URL completa do Load Balancer"
  value       = "http://${aws_lb.sf_alb_backend_distribuidor.dns_name}"
}

# ================================================================
# APPLICATION URLs
# ================================================================

output "frontend_url" {
  description = "URL do Frontend (Nginx)"
  value       = "http://${aws_eip.sf_eip_frontend.public_ip}"
}

output "backend_api_url" {
  description = "URL da API Backend (através do ALB)"
  value       = "http://${aws_lb.sf_alb_backend_distribuidor.dns_name}/api"
}

# ================================================================
# SSH CONNECTION STRINGS
# ================================================================

output "ssh_frontend" {
  description = "Comando SSH para conectar no Frontend"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_eip.sf_eip_frontend.public_ip}"
}

output "ssh_backend_01" {
  description = "Comando SSH para conectar no Backend 01"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_eip.sf_eip_backend_01.public_ip}"
}

output "ssh_backend_02" {
  description = "Comando SSH para conectar no Backend 02"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_eip.sf_eip_backend_02.public_ip}"
}

output "ssh_database" {
  description = "Comando SSH para conectar no MySQL"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_eip.sf_eip_database.public_ip}"
}

# ================================================================
# DATABASE CONNECTION
# ================================================================

output "mysql_host" {
  description = "Host do MySQL (para configuração da aplicação)"
  value       = aws_eip.sf_eip_database.private_ip
}

output "mysql_connection_string" {
  description = "String de conexão MySQL"
  value       = "jdbc:mysql://${aws_eip.sf_eip_database.private_ip}:3306/safestock"
  sensitive   = false
}

# ================================================================
# SECURITY GROUPS
# ================================================================

output "security_groups" {
  description = "IDs dos Security Groups criados"
  value = {
    frontend = aws_security_group.sf_sg_frontend_nginx.id
    backend  = aws_security_group.sf_sg_backend_springboot.id
    database = aws_security_group.sf_sg_database_mysql.id
    alb      = aws_security_group.sf_sg_lb_publico.id
  }
}

# ================================================================
# SUBNETS
# ================================================================

output "subnets" {
  description = "IDs das Subnets criadas"
  value = {
    public = {
      frontend = aws_subnet.sf_subnet_publica_frontend.id
      lb       = aws_subnet.sf_subnet_publica_lb.id
    }
    private = {
      backend  = aws_subnet.sf_subnet_privada_backend.id
      database = aws_subnet.sf_subnet_privada_database.id
    }
  }
}

# ================================================================
# DEPLOYMENT INFO
# ================================================================

output "deployment_summary" {
  description = "Resumo do deployment"
  value = {
    region           = var.aws_region
    project          = var.project_name
    environment      = var.environment
    vpc_cidr         = var.vpc_cidr
    frontend_url     = "http://${aws_eip.sf_eip_frontend.public_ip}"
    api_url          = "http://${aws_lb.sf_alb_backend_distribuidor.dns_name}/api"
    mysql_host       = aws_eip.sf_eip_database.private_ip
    total_instances  = 4
    repository_url   = var.repository_url
  }
}