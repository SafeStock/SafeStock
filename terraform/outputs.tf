# ================================================================
# OUTPUTS - INFORMAÇÕES IMPORTANTES APÓS O DEPLOY
# ================================================================

# VPC Information
output "vpc_id" {
  description = "ID da VPC principal"
  value       = aws_vpc.safestock_vpc.id
}

output "vpc_cidr" {
  description = "CIDR Block da VPC"
  value       = aws_vpc.safestock_vpc.cidr_block
}

# ================================================================
# ELASTIC IP
# ================================================================

output "ec2_public_ip" {
  description = "IP público da instância EC2"
  value       = aws_eip.safestock_eip.public_ip
}

output "ec2_public_dns" {
  description = "DNS público da instância EC2"
  value       = aws_instance.safestock_ec2.public_dns
}

# ================================================================
# APPLICATION URLs
# ================================================================

output "application_url" {
  description = "URL da aplicação SafeStock"
  value       = "http://${aws_eip.safestock_eip.public_ip}"
}

output "api_url" {
  description = "URL da API"
  value       = "http://${aws_eip.safestock_eip.public_ip}:8081/api"
}

# ================================================================
# SSH CONNECTION STRINGS
# ================================================================

output "ssh_command" {
  description = "Comando SSH para conectar na EC2"
  value       = "ssh -i ssh-keys/safestock-keypair.pem ec2-user@${aws_eip.safestock_eip.public_ip}"
}

# ================================================================
# EC2 INSTANCE
# ================================================================

output "ec2_instance_id" {
  description = "ID da instância EC2"
  value       = aws_instance.safestock_ec2.id
}

output "ec2_instance_type" {
  description = "Tipo de instância EC2"
  value       = aws_instance.safestock_ec2.instance_type
}

output "ec2_private_ip" {
  description = "IP privado da instância EC2"
  value       = aws_instance.safestock_ec2.private_ip
}

# ================================================================
# DEPLOYMENT INFO
# ================================================================

output "deployment_summary" {
  description = "Resumo do deployment - Single EC2 com Docker Compose"
  value = {
    region           = var.aws_region
    project          = var.project_name
    environment      = var.environment
    vpc_cidr         = var.vpc_cidr
    architecture     = "Single EC2 (All-In-One) com Docker Compose"
    instance_type    = var.instance_type
    instance_id      = aws_instance.safestock_ec2.id
    public_ip        = aws_eip.safestock_eip.public_ip
    public_dns       = aws_instance.safestock_ec2.public_dns
    private_ip       = aws_instance.safestock_ec2.private_ip
    containers       = "Frontend (React/Nginx) + 2x Backend (Spring Boot) + MySQL + RabbitMQ + Redis"
    root_volume_size = var.root_volume_size
    cost_optimized   = "Sim - apenas 1 EC2 ${var.instance_type}"
    ssh_command      = "ssh -i ssh-keys/safestock-keypair.pem ec2-user@${aws_eip.safestock_eip.public_ip}"
    app_url          = "http://${aws_eip.safestock_eip.public_ip}"
    api_url          = "http://${aws_eip.safestock_eip.public_ip}:8081/api"
    repository_url   = var.repository_url
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