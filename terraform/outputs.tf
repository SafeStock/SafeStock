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

output "load_balancer_public_ip" {
  description = "IP público do Load Balancer (Nginx)"
  value       = aws_instance.sf_ec2_load_balancer.public_ip
}

output "backend_01_private_ip" {
  description = "IP privado do Backend Server 01 (Spring Boot) - acessado via Load Balancer Nginx"
  value       = aws_instance.sf_ec2_backend_spring_01.private_ip
}

output "backend_02_private_ip" {
  description = "IP privado do Backend Server 02 (Spring Boot) - acessado via Load Balancer Nginx"
  value       = aws_instance.sf_ec2_backend_spring_02.private_ip
}

output "database_private_ip" {
  description = "IP privado do servidor MySQL - acessado pelos backends"
  value       = aws_instance.sf_ec2_database_mysql.private_ip
}

# ================================================================
# LOAD BALANCER (Nginx)
# ================================================================

output "load_balancer_dns_name" {
  description = "IP público do Load Balancer (Nginx)"
  value       = aws_instance.sf_ec2_load_balancer.public_ip
}

output "load_balancer_url" {
  description = "URL completa do Load Balancer Nginx"
  value       = "http://${aws_instance.sf_ec2_load_balancer.public_ip}"
}

# ================================================================
# APPLICATION URLs
# ================================================================

output "frontend_url" {
  description = "URL do Frontend (Nginx)"
  value       = "http://${aws_eip.sf_eip_frontend.public_ip}"
}

output "backend_api_url" {
  description = "URL da API Backend (através do Load Balancer Nginx)"
  value       = "http://${aws_instance.sf_ec2_load_balancer.public_ip}/api"
}

# ================================================================
# SSH CONNECTION STRINGS
# ================================================================

output "ssh_frontend" {
  description = "Comando SSH para conectar no Frontend"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_eip.sf_eip_frontend.public_ip}"
}

output "ssh_backend_01" {
  description = "Backend 01 está em subnet privada - usar AWS Session Manager ou bastion host"
  value       = "aws ssm start-session --target ${aws_instance.sf_ec2_backend_spring_01.id}"
}

output "ssh_backend_02" {
  description = "Backend 02 está em subnet privada - usar AWS Session Manager ou bastion host"
  value       = "aws ssm start-session --target ${aws_instance.sf_ec2_backend_spring_02.id}"
}

output "ssh_database" {
  description = "Database está em subnet privada - usar AWS Session Manager ou bastion host"
  value       = "aws ssm start-session --target ${aws_instance.sf_ec2_database_mysql.id}"
}

# ================================================================
# DATABASE CONNECTION
# ================================================================

output "mysql_host" {
  description = "Host do MySQL (para configuração da aplicação)"
  value       = aws_instance.sf_ec2_database_mysql.private_ip
}

output "mysql_connection_string" {
  description = "String de conexão MySQL"
  value       = "jdbc:mysql://${aws_instance.sf_ec2_database_mysql.private_ip}:3306/safestock"
  sensitive   = false
}

# ================================================================
# SECURITY GROUPS
# ================================================================

output "security_groups" {
  description = "IDs dos Security Groups criados"
  value = {
    frontend     = aws_security_group.sf_sg_frontend_nginx.id
    backend      = aws_security_group.sf_sg_backend_springboot.id
    database     = aws_security_group.sf_sg_database_mysql.id
    loadbalancer = aws_security_group.sf_sg_lb_publico.id
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
    api_url          = "http://${aws_instance.sf_ec2_load_balancer.public_ip}/api"
    mysql_host       = aws_instance.sf_ec2_database_mysql.private_ip
    total_instances  = 4
    repository_url   = var.repository_url
  }
}