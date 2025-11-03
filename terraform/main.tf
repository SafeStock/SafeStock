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

# AMI Ubuntu 22.04 LTS para us-east-1 (valor fixo para contornar restrições de permissão)
# AMI ID: ami-0c02fb55956c7d316 (Ubuntu 22.04 LTS em us-east-1)
locals {
  ubuntu_ami_id = "ami-0c02fb55956c7d316"
  availability_zones = ["us-east-1a", "us-east-1b"]
}

# ================================================================
# VPC E NETWORKING
# ================================================================

# VPC Principal
resource "aws_vpc" "sf_vpc_principal" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "sf-vpc-principal"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "sf_igw_acesso_publico" {
  vpc_id = aws_vpc.sf_vpc_principal.id

  tags = {
    Name = "sf-igw-acesso-publico"
  }
}

# ================================================================
# SUBNETS PÚBLICAS
# ================================================================

# Subnet Pública - Frontend
resource "aws_subnet" "sf_subnet_publica_frontend" {
  vpc_id                  = aws_vpc.sf_vpc_principal.id
  cidr_block              = var.subnet_publica_frontend_cidr
  availability_zone       = local.availability_zones[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "sf-subnet-publica-frontend"
    Type = "Public"
  }
}

# Subnet Pública - Load Balancer
resource "aws_subnet" "sf_subnet_publica_lb" {
  vpc_id                  = aws_vpc.sf_vpc_principal.id
  cidr_block              = var.subnet_publica_lb_cidr
  availability_zone       = local.availability_zones[1]
  map_public_ip_on_launch = true

  tags = {
    Name = "sf-subnet-publica-lb"
    Type = "Public"
  }
}

# ================================================================
# SUBNETS PRIVADAS
# ================================================================

# Subnet Privada - Backend
resource "aws_subnet" "sf_subnet_privada_backend" {
  vpc_id            = aws_vpc.sf_vpc_principal.id
  cidr_block        = var.subnet_privada_backend_cidr
  availability_zone = local.availability_zones[0]

  tags = {
    Name = "sf-subnet-privada-backend"
    Type = "Private"
  }
}

# Subnet Privada - Database
resource "aws_subnet" "sf_subnet_privada_database" {
  vpc_id            = aws_vpc.sf_vpc_principal.id
  cidr_block        = var.subnet_privada_database_cidr
  availability_zone = local.availability_zones[1]

  tags = {
    Name = "sf-subnet-privada-database"
    Type = "Private"
  }
}

# ================================================================
# ELASTIC IPS - APENAS ONDE REALMENTE PRECISAMOS
# ================================================================

# EIP Frontend (acesso público direto necessário)
resource "aws_eip" "sf_eip_frontend" {
  domain = "vpc"
  
  depends_on = [aws_internet_gateway.sf_igw_acesso_publico]

  tags = {
    Name = "sf-eip-frontend"
  }
}

# NOTA: 
# - ALB recebe IP público automaticamente
# - Backends ficam privados (acessados via ALB)
# - Database fica privado (acessado pelos backends)
# - NAT Gateway pode usar IP público automático

# ================================================================
# NAT GATEWAY
# ================================================================

# Elastic IP para o NAT Gateway
resource "aws_eip" "sf_eip_nat_gateway" {
  domain = "vpc"
  
  tags = {
    Name = "sf-eip-nat-gateway"
  }
  
  depends_on = [aws_internet_gateway.sf_igw_acesso_publico]
}

# NAT Gateway para subnets privadas (com EIP dedicado)
resource "aws_nat_gateway" "sf_nat_gateway_privadas" {
  allocation_id = aws_eip.sf_eip_nat_gateway.id
  subnet_id     = aws_subnet.sf_subnet_publica_frontend.id

  tags = {
    Name = "sf-nat-gateway-privadas"
  }

  depends_on = [aws_internet_gateway.sf_igw_acesso_publico]
}

# ================================================================
# ROUTE TABLES
# ================================================================

# Route Table para Subnets Públicas
resource "aws_route_table" "sf_rt_subnets_publicas" {
  vpc_id = aws_vpc.sf_vpc_principal.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.sf_igw_acesso_publico.id
  }

  tags = {
    Name = "sf-rt-subnets-publicas"
  }
}

# Route Table para Subnets Privadas
resource "aws_route_table" "sf_rt_subnets_privadas" {
  vpc_id = aws_vpc.sf_vpc_principal.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.sf_nat_gateway_privadas.id
  }

  tags = {
    Name = "sf-rt-subnets-privadas"
  }
}

# ================================================================
# ROUTE TABLE ASSOCIATIONS
# ================================================================

# Associações Subnets Públicas
resource "aws_route_table_association" "sf_rta_publica_frontend" {
  subnet_id      = aws_subnet.sf_subnet_publica_frontend.id
  route_table_id = aws_route_table.sf_rt_subnets_publicas.id
}

resource "aws_route_table_association" "sf_rta_publica_lb" {
  subnet_id      = aws_subnet.sf_subnet_publica_lb.id
  route_table_id = aws_route_table.sf_rt_subnets_publicas.id
}

# Associações Subnets Privadas
resource "aws_route_table_association" "sf_rta_privada_backend" {
  subnet_id      = aws_subnet.sf_subnet_privada_backend.id
  route_table_id = aws_route_table.sf_rt_subnets_privadas.id
}

resource "aws_route_table_association" "sf_rta_privada_database" {
  subnet_id      = aws_subnet.sf_subnet_privada_database.id
  route_table_id = aws_route_table.sf_rt_subnets_privadas.id
}

# ================================================================
# SECURITY GROUPS
# ================================================================

# Security Group - Frontend (Nginx)
resource "aws_security_group" "sf_sg_frontend_nginx" {
  name_prefix = "sf-sg-frontend-nginx"
  vpc_id      = aws_vpc.sf_vpc_principal.id

  # HTTP
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.allowed_http_cidr
  }

  # HTTPS
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.allowed_http_cidr
  }

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ssh_cidr
  }

  # Outbound - All traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "sf-sg-frontend-nginx"
  }
}

# Security Group - Backend (Spring Boot)
resource "aws_security_group" "sf_sg_backend_springboot" {
  name_prefix = "sf-sg-backend-springboot"
  vpc_id      = aws_vpc.sf_vpc_principal.id

  # Spring Boot Port (from ALB)
  ingress {
    description     = "Spring Boot from ALB"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.sf_sg_lb_publico.id]
  }

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ssh_cidr
  }

  # Outbound - All traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "sf-sg-backend-springboot"
  }
}

# Security Group - Database (MySQL)
resource "aws_security_group" "sf_sg_database_mysql" {
  name_prefix = "sf-sg-database-mysql"
  vpc_id      = aws_vpc.sf_vpc_principal.id

  # MySQL (from Backend)
  ingress {
    description     = "MySQL from Backend"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.sf_sg_backend_springboot.id]
  }

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ssh_cidr
  }

  # Outbound - All traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "sf-sg-database-mysql"
  }
}

# Security Group - Load Balancer
resource "aws_security_group" "sf_sg_lb_publico" {
  name_prefix = "sf-sg-lb-publico"
  vpc_id      = aws_vpc.sf_vpc_principal.id

  # HTTP
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.allowed_http_cidr
  }

  # HTTPS
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.allowed_http_cidr
  }

  # Outbound - All traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "sf-sg-lb-publico"
  }
}

# ================================================================
# KEY PAIR - COMENTADO PARA EVITAR PROBLEMAS DE PERMISSÃO
# ================================================================
# NOTA: Para usar SSH, você pode:
# 1. Criar uma chave manualmente no console AWS
# 2. Ou usar AWS Session Manager para conectar
# 
# resource "aws_key_pair" "sf_keypair_main" {
#   key_name   = var.key_pair_name
#   public_key = file("~/.ssh/${var.key_pair_name}.pub")
#   tags = {
#     Name = "sf-keypair-main"
#   }
# }

# ================================================================
# INSTÂNCIAS EC2
# ================================================================

# EC2 - Frontend (Nginx + React)
resource "aws_instance" "sf_ec2_frontend_nginx" {
  ami                    = local.ubuntu_ami_id
  instance_type          = var.instance_type_frontend
  # key_name              = aws_key_pair.sf_keypair_main.key_name  # Removido temporariamente
  subnet_id             = aws_subnet.sf_subnet_publica_frontend.id
  vpc_security_group_ids = [aws_security_group.sf_sg_frontend_nginx.id]

  user_data = base64encode(templatefile("${path.module}/user-data/frontend-user-data.sh", {
    repository_url      = var.repository_url
    load_balancer_ip    = aws_instance.sf_ec2_load_balancer.private_ip
  }))

  tags = {
    Name = "sf-ec2-frontend-nginx"
    Type = "Frontend"
  }
}

# EC2 - Backend 01 (Spring Boot)
resource "aws_instance" "sf_ec2_backend_spring_01" {
  ami                    = local.ubuntu_ami_id
  instance_type          = var.instance_type_backend
  # key_name              = aws_key_pair.sf_keypair_main.key_name  # Removido temporariamente
  subnet_id             = aws_subnet.sf_subnet_privada_backend.id
  vpc_security_group_ids = [aws_security_group.sf_sg_backend_springboot.id]

  user_data = base64encode(templatefile("${path.module}/user-data/backend-user-data.sh", {
    repository_url     = var.repository_url
    mysql_host        = aws_instance.sf_ec2_database_mysql.private_ip
    mysql_password    = var.mysql_app_password
  }))

  tags = {
    Name = "sf-ec2-backend-spring-01"
    Type = "Backend"
  }
}

# EC2 - Backend 02 (Spring Boot)
resource "aws_instance" "sf_ec2_backend_spring_02" {
  ami                    = local.ubuntu_ami_id
  instance_type          = var.instance_type_backend
  # key_name              = aws_key_pair.sf_keypair_main.key_name  # Removido temporariamente
  subnet_id             = aws_subnet.sf_subnet_privada_backend.id
  vpc_security_group_ids = [aws_security_group.sf_sg_backend_springboot.id]

  user_data = base64encode(templatefile("${path.module}/user-data/backend-user-data.sh", {
    repository_url     = var.repository_url
    mysql_host        = aws_instance.sf_ec2_database_mysql.private_ip
    mysql_password    = var.mysql_app_password
  }))

  tags = {
    Name = "sf-ec2-backend-spring-02"
    Type = "Backend"
  }
}

# EC2 - Database (MySQL)
resource "aws_instance" "sf_ec2_database_mysql" {
  ami                    = local.ubuntu_ami_id
  instance_type          = var.instance_type_database
  # key_name              = aws_key_pair.sf_keypair_main.key_name  # Removido temporariamente
  subnet_id             = aws_subnet.sf_subnet_privada_database.id
  vpc_security_group_ids = [aws_security_group.sf_sg_database_mysql.id]

  user_data = base64encode(templatefile("${path.module}/user-data/database-user-data.sh", {
    mysql_root_password = var.mysql_root_password
    mysql_app_password  = var.mysql_app_password
  }))

  tags = {
    Name = "sf-ec2-database-mysql"
    Type = "Database"
  }
}

# ================================================================
# ELASTIC IP ASSOCIATIONS - APENAS FRONTEND
# ================================================================

# Associar EIP apenas ao Frontend (que precisa de acesso público direto)
resource "aws_eip_association" "sf_eip_assoc_frontend" {
  instance_id   = aws_instance.sf_ec2_frontend_nginx.id
  allocation_id = aws_eip.sf_eip_frontend.id
}

# NOTA: Outros recursos não precisam de EIP:
# - ALB: Recebe IP público automaticamente
# - Backends: Acessados via ALB (privados)
# - Database: Acessado pelos backends (privado)

# ================================================================
# LOAD BALANCER EC2 (NGINX) - VERSÃO BARATA
# ================================================================

# EC2 - Load Balancer (Nginx fazendo proxy para backends)
resource "aws_instance" "sf_ec2_load_balancer" {
  ami                    = local.ubuntu_ami_id
  instance_type          = "t3.micro"  # Bem barato
  subnet_id             = aws_subnet.sf_subnet_publica_lb.id
  vpc_security_group_ids = [aws_security_group.sf_sg_frontend_nginx.id]

  user_data = base64encode(templatefile("${path.module}/user-data/loadbalancer-user-data.sh", {
    backend_01_ip = aws_instance.sf_ec2_backend_spring_01.private_ip
    backend_02_ip = aws_instance.sf_ec2_backend_spring_02.private_ip
  }))

  tags = {
    Name = "sf-ec2-load-balancer"
    Type = "LoadBalancer"
  }
}