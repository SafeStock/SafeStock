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
# VPC E NETWORKING
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
# SUBNET PÚBLICA (para EC2 com docker-compose todo-em-um)
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
# ROUTE TABLE PÚBLICA
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
# SECURITY GROUP - ÚNICO EC2 COM TUDO
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
  
  cidr_ipv4 = var.allowed_ssh_cidr
  
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
  
  cidr_ipv4 = var.allowed_http_cidr
  
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
  
  cidr_ipv4 = var.allowed_https_cidr
  
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
  
  cidr_ipv4 = "0.0.0.0/0"
  
  tags = {
    Name = "allow-all-outbound"
  }
}

# ================================================================
# ELASTIC IP
# ================================================================

resource "aws_eip" "safestock_eip" {
  domain            = "vpc"
  network_interface = aws_network_interface.safestock_eni.id
  
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
# EC2 - SINGLE INSTANCE COM TUDO
# ================================================================

resource "aws_instance" "safestock_ec2" {
  ami                     = data.aws_ami.amazon_linux_2.id
  instance_type           = var.instance_type
  key_name                = var.key_pair_name
  monitoring              = var.enable_monitoring
  iam_instance_profile    = aws_iam_instance_profile.safestock_profile.name
  
  # Network interface
  network_interface {
    network_interface_id = aws_network_interface.safestock_eni.id
    device_index         = 0
  }

  # Root volume
  root_block_device {
    volume_type           = var.root_volume_type
    volume_size           = var.root_volume_size
    delete_on_termination = true
    encrypted             = var.encrypt_root_volume

    tags = {
      Name = "safestock-root-volume"
    }
  }

  # User data script - instala tudo
  user_data = base64encode(
    templatefile("${path.module}/user-data/safestock-complete.sh", {
      repository_url         = var.repository_url
      repository_branch      = var.repository_branch
      mysql_root_password    = var.mysql_root_password
      mysql_user             = var.mysql_user
      mysql_password         = var.mysql_password
      rabbitmq_user          = var.rabbitmq_user
      rabbitmq_password      = var.rabbitmq_password
      environment            = var.environment
    })
  )

  # Timeout para user data
  user_data_replace_on_change = true

  monitoring              = true
  associate_public_ip_address = true

  tags = {
    Name = "safestock-ec2"
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
# IAM ROLE PARA EC2 (acesso a AWS services)
# ================================================================

resource "aws_iam_role" "safestock_role" {
  name = "safestock-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "safestock-ec2-role"
  }
}

# Policy para EC2 acessar SSM, CloudWatch, S3, etc
resource "aws_iam_role_policy_attachment" "safestock_ssm_policy" {
  role       = aws_iam_role.safestock_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "safestock_cloudwatch_policy" {
  role       = aws_iam_role.safestock_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

# Policy customizada para S3 (backups, assets, etc)
resource "aws_iam_role_policy" "safestock_s3_policy" {
  name = "safestock-s3-policy"
  role = aws_iam_role.safestock_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::safestock-*",
          "arn:aws:s3:::safestock-*/*"
        ]
      }
    ]
  })
}

resource "aws_iam_instance_profile" "safestock_profile" {
  name = "safestock-ec2-profile"
  role = aws_iam_role.safestock_role.name
}

# ================================================================
# VOLUMES ADICIONAIS (para persistência de dados)
# ================================================================

resource "aws_ebs_volume" "safestock_data_volume" {
  availability_zone = var.availability_zone
  size              = var.data_volume_size
  type              = var.data_volume_type
  encrypted         = var.encrypt_data_volume
  
  tags = {
    Name = "safestock-data-volume"
  }
}

resource "aws_volume_attachment" "safestock_data_attachment" {
  device_name = "/dev/sdf"
  volume_id   = aws_ebs_volume.safestock_data_volume.id
  instance_id = aws_instance.safestock_ec2.id
}

# ================================================================
# CLOUDWATCH ALARMS (Monitoramento Básico)
# ================================================================

resource "aws_cloudwatch_metric_alarm" "cpu_utilization" {
  alarm_name          = "safestock-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Alerta quando CPU > 80%"

  dimensions = {
    InstanceId = aws_instance.safestock_ec2.id
  }

  tags = {
    Name = "safestock-cpu-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "disk_space" {
  alarm_name          = "safestock-low-disk"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "DiskUtilization"
  namespace           = "CWAgent"
  period              = 300
  statistic           = "Average"
  threshold           = 85
  alarm_description   = "Alerta quando disco > 85%"

  dimensions = {
    InstanceId = aws_instance.safestock_ec2.id
  }

  tags = {
    Name = "safestock-disk-alarm"
  }
}

# ================================================================
# SECURITY - BACKUP AUTOMÁTICO COM SNAPSHOTS
# ================================================================

resource "aws_dlm_lifecycle_policy" "safestock_backup" {
  count = var.enable_automatic_backups ? 1 : 0

  execution_role_arn = aws_iam_role.backup_role[0].arn
  description        = "Backup automático de volumes SafeStock"
  state               = "ENABLED"

  policy_details {
    resource_types = ["VOLUME"]

    schedule {
      name = "Daily Backups"

      create_rule {
        interval      = 24
        interval_unit = "HOURS"
        times         = ["03:00"]  # 3AM UTC
      }

      retain_rule {
        count = 7  # Guardar 7 backups
      }

      tags_to_add = {
        Name = "safestock-backup"
      }

      copy_tags = true
    }

    target_tags = {
      Backup = "true"
    }
  }

  tags = {
    Name = "safestock-backup-policy"
  }
}

resource "aws_iam_role" "backup_role" {
  count = var.enable_automatic_backups ? 1 : 0
  name  = "safestock-backup-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "dlm.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "safestock-backup-role"
  }
}

resource "aws_iam_role_policy_attachment" "backup_policy" {
  count      = var.enable_automatic_backups ? 1 : 0
  role       = aws_iam_role.backup_role[0].name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSDataLifecycleManagerDefaultRole"
}

# ================================================================
# TAGS PARA VOLUMES (para backups)
# ================================================================

resource "aws_ec2_tag" "root_volume_backup" {
  resource_id = aws_instance.safestock_ec2.root_block_device[0].volume_id
  key         = "Backup"
  value       = "true"
}

resource "aws_ec2_tag" "data_volume_backup" {
  resource_id = aws_ebs_volume.safestock_data_volume.id
  key         = "Backup"
  value       = "true"
}
