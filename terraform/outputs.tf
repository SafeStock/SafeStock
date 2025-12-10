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
  description = "IP público do servidor Frontend + Proxy (Nginx)"
  value       = aws_eip.sf_eip_frontend.public_ip
}

output "frontend_public_dns" {
  description = "DNS público do servidor Frontend + Proxy (Nginx)"
  value       = aws_instance.sf_ec2_frontend_proxy.public_dns
}

output "backend1_private_ip" {
  description = "IP privado fixo do backend 1"
  value       = aws_network_interface.backend1_nic.private_ips[0]
}

output "backend2_private_ip" {
  description = "IP privado fixo do backend 2"
  value       = aws_network_interface.backend2_nic.private_ips[0]
}

# ================================================================
# APPLICATION URLs
# ================================================================

output "application_url" {
  description = "URL da aplicação SafeStock"
  value       = "http://${aws_eip.sf_eip_frontend.public_ip}"
}

output "api_url" {
  description = "URL da API (proxy com load balancer integrado)"
  value       = "http://${aws_eip.sf_eip_frontend.public_ip}/api"
}

output "frontend_url" {
  description = "URL do Frontend (Nginx + Proxy)"
  value       = "http://${aws_instance.sf_ec2_frontend_proxy.public_dns}"
}

output "frontend_url_by_ip" {
  description = "URL do Frontend usando IP fixo"
  value       = "http://${aws_eip.sf_eip_frontend.public_ip}"
}

# ================================================================
# SSH CONNECTION STRINGS
# ================================================================

output "ssh_frontend" {
  description = "Comando SSH para conectar no Frontend + Proxy"
  value       = "ssh -i ssh-keys/sf-keypair-${var.environment}.pem ubuntu@${aws_eip.sf_eip_frontend.public_ip}"
}

output "ssh_backend_containers" {
  description = "Backend containers está em subnet privada - usar Session Manager ou bastion"
  value       = "aws ssm start-session --target ${aws_instance.sf_ec2_backend_containers.id}"
}

output "rabbitmq_management_tunnel" {
  description = "Comando para acessar RabbitMQ Management via SSH tunnel"
  value       = "ssh -i ssh-keys/sf-keypair-${var.environment}.pem -L 15672:${aws_instance.sf_ec2_backend_containers.private_ip}:15672 ubuntu@${aws_eip.sf_eip_frontend.public_ip}"
}

# ================================================================
# DATABASE CONNECTION
# ================================================================

output "mysql_host" {
  description = "Host do MySQL (container no backend server)"
  value       = aws_instance.sf_ec2_backend_containers.private_ip
}

output "mysql_connection_string" {
  description = "String de conexão MySQL (container)"
  value       = "jdbc:mysql://${aws_instance.sf_ec2_backend_containers.private_ip}:3306/safestockDB"
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
  description = "Resumo do deployment - Arquitetura Simples com Containers"
  value = {
    region              = var.aws_region
    project             = var.project_name
    environment         = var.environment
    vpc_cidr            = var.vpc_cidr
    architecture        = "Frontend+Proxy + Backend Containers"
    frontend_dns        = aws_instance.sf_ec2_frontend_proxy.public_dns
    frontend_ip         = aws_eip.sf_eip_frontend.public_ip
    backend_containers  = aws_instance.sf_ec2_backend_containers.private_ip
    containers          = "2x Spring Boot + MySQL + RabbitMQ"
    total_instances     = 2
    cost_optimized      = "Sim - apenas 2 EC2s (t3.micro + t3.small)"
    repository_url      = var.repository_url
  }
}

# ================================================
# OUTPUTS DO DOMÍNIO (OPCIONAIS)
# ================================================

## Name servers para configurar no registrador (apenas se domínio for fornecido)
# output "name_servers" {
#   description = "Name servers para configurar no registrador do domínio"
#   value       = var.domain_name != "" ? aws_route53_zone.sf_main_domain[0].name_servers : []
# }

## URLs do domínio configurado (apenas se domínio for fornecido)
# output "domain_urls" {
#   description = "URLs do domínio personalizado"
#   value = var.domain_name != "" ? {
#     frontend = "http://${var.domain_name}"
#     api      = "http://api.${var.domain_name}"
#     www      = "http://www.${var.domain_name}"
#   } : {}
# }