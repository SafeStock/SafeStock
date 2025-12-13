terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configuração do Provider AWS
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = var.common_tags
  }
}

# ================================================================
# DATA SOURCES
# ================================================================

# AMI Amazon Linux 2 mais recente
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp3"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ================================================================
# VPC E NETWORKING - SIMPLIFICADO PARA SINGLE EC2
# ================================================================

# VPC Principal
resource "aws_vpc" "safestock_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "safestock-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "safestock_igw" {
  vpc_id = aws_vpc.safestock_vpc.id

  tags = {
    Name = "safestock-igw"
  }
}

# ================================================================
# SUBNET ÚNICA - PÚBLICA (para EC2 com Docker Compose todo-em-um)
# ================================================================

resource "aws_subnet" "safestock_subnet_public" {
  vpc_id                  = aws_vpc.safestock_vpc.id
  cidr_block              = var.subnet_public_cidr
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true

  tags = {
    Name = "safestock-subnet-public"
    Type = "Public"
  }
}

# ================================================================
# ROUTE TABLE PÚBLICA - ÚNICA PARA SINGLE EC2
# ================================================================

resource "aws_route_table" "safestock_rt_public" {
  vpc_id = aws_vpc.safestock_vpc.id

  route {
    cidr_block      = "0.0.0.0/0"
    gateway_id      = aws_internet_gateway.safestock_igw.id
  }

  tags = {
    Name = "safestock-rt-public"
  }
}

resource "aws_route_table_association" "safestock_rta_public" {
  subnet_id      = aws_subnet.safestock_subnet_public.id
  route_table_id = aws_route_table.safestock_rt_public.id
}



# ================================================================
# SECURITY GROUP - ÚNICO PARA SINGLE EC2
# ================================================================

resource "aws_security_group" "safestock_sg" {
  name        = "safestock-security-group"
  description = "Security group para SafeStock - single EC2 com Docker Compose"
  vpc_id      = aws_vpc.safestock_vpc.id

  tags = {
    Name = "safestock-sg"
  }
}

# SSH - Acesso remoto
resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
  security_group_id = aws_security_group.safestock_sg.id
  description       = "Allow SSH"
  
  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"
  cidr_ipv4   = var.allowed_ssh_cidr
  
  tags = {
    Name = "allow-ssh"
  }
}

# HTTP - Frontend
resource "aws_vpc_security_group_ingress_rule" "allow_http" {
  security_group_id = aws_security_group.safestock_sg.id
  description       = "Allow HTTP for frontend"
  
  from_port   = 80
  to_port     = 80
  ip_protocol = "tcp"
  cidr_ipv4   = var.allowed_http_cidr
  
  tags = {
    Name = "allow-http"
  }
}

# HTTPS - Futuro SSL/TLS
resource "aws_vpc_security_group_ingress_rule" "allow_https" {
  security_group_id = aws_security_group.safestock_sg.id
  description       = "Allow HTTPS for future SSL"
  
  from_port   = 443
  to_port     = 443
  ip_protocol = "tcp"
  cidr_ipv4   = var.allowed_https_cidr
  
  tags = {
    Name = "allow-https"
  }
}

# Egress - Saída (tudo permitido)
resource "aws_vpc_security_group_egress_rule" "allow_all_outbound" {
  security_group_id = aws_security_group.safestock_sg.id
  description       = "Allow all outbound traffic"
  
  from_port   = 0
  to_port     = 0
  ip_protocol = "-1"
  cidr_ipv4   = "0.0.0.0/0"
  
  tags = {
    Name = "allow-all-outbound"
  }
}

# ================================================================
# ELASTIC IP
# ================================================================

resource "aws_eip" "safestock_eip" {
  domain = "vpc"
  
  depends_on = [aws_internet_gateway.safestock_igw]

  tags = {
    Name = "safestock-eip"
  }
}

# ================================================================
# NETWORK INTERFACE
# ================================================================

resource "aws_network_interface" "safestock_eni" {
  subnet_id           = aws_subnet.safestock_subnet_public.id
  security_groups     = [aws_security_group.safestock_sg.id]

  tags = {
    Name = "safestock-eni"
  }
}

# ================================================================
# EC2 - SINGLE INSTANCE COM TUDO (DOCKER COMPOSE)
# ================================================================

resource "aws_instance" "safestock_ec2" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type
  key_name      = var.key_pair_name
  
  # Network interface
  network_interface {
    network_interface_id = aws_network_interface.safestock_eni.id
    device_index         = 0
  }

  # Root volume - Generoso para evitar problemas de espaço
  root_block_device {
    volume_type           = "gp3"
    volume_size           = 50  # 50GB para Docker + aplicação + dados
    delete_on_termination = true

    tags = {
      Name = "safestock-root-volume"
    }
  }

  # User data script - instala Docker e inicia aplicação
  user_data = base64encode(
    templatefile("${path.module}/user-data/safestock-complete.sh", {
      repository_url      = var.repository_url
      repository_branch   = var.repository_branch
      mysql_root_password = var.mysql_root_password
      mysql_user          = var.mysql_user
      mysql_password      = var.mysql_password
      rabbitmq_user       = var.rabbitmq_user
      rabbitmq_password   = var.rabbitmq_password
      environment         = var.environment
    })
  )

  user_data_replace_on_change = true
  associate_public_ip_address = true

  tags = {
    Name = "safestock-ec2"
    Type = "Docker-Compose-All-In-One"
  }

  depends_on = [
    aws_internet_gateway.safestock_igw
  ]

  # Aguardar até 10 minutos para o setup
  timeouts {
    create = "10m"
  }
}

# ================================================================
# ELASTIC IP ASSOCIATION
# ================================================================

resource "aws_eip_association" "safestock_eip_assoc" {
  instance_id       = aws_instance.safestock_ec2.id
  allocation_id     = aws_eip.safestock_eip.id
}

## ================================================
## DNS E DOMÍNIO - ROUTE 53 (OPCIONAL)
## ================================================

# resource "aws_route53_zone" "sf_main_domain" {
#   count = var.domain_name != "" ? 1 : 0
#   name  = var.domain_name
#
#   tags = merge(var.common_tags, {
#     Name = "sf-hosted-zone-main"
#     Type = "DNS"
#   })
# }
#
# resource "aws_route53_record" "sf_frontend" {
#   count   = var.domain_name != "" ? 1 : 0
#   zone_id = aws_route53_zone.sf_main_domain[0].zone_id
#   name    = var.domain_name
#   type    = "A"
#   ttl     = 300
#   records = [aws_eip.sf_eip_frontend.public_ip]
# }
#
# resource "aws_route53_record" "sf_api" {
#   count   = var.domain_name != "" ? 1 : 0
#   zone_id = aws_route53_zone.sf_main_domain[0].zone_id
#   name    = "api.${var.domain_name}"
#   type    = "A"
#   ttl     = 300
#   records = [aws_eip.sf_eip_frontend.public_ip]
# }
#
# resource "aws_route53_record" "sf_www" {
#   count   = var.domain_name != "" ? 1 : 0
#   zone_id = aws_route53_zone.sf_main_domain[0].zone_id
#   name    = "www.${var.domain_name}"
#   type    = "CNAME"
#   ttl     = 300
#   records = [var.domain_name]
# }