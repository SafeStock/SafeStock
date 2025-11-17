# ================================================
# SSH Key Pair Management
# ================================================
# Gera par de chaves SSH e salva localmente

# Gerar chave privada RSA
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Criar Key Pair na AWS com a chave pública
resource "aws_key_pair" "main" {
  key_name   = "sf-keypair-${var.environment}"
  public_key = tls_private_key.ssh_key.public_key_openssh

  tags = {
    Name        = "sf-keypair-${var.environment}"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

# Salvar chave privada em arquivo local
resource "local_file" "private_key" {
  content         = tls_private_key.ssh_key.private_key_pem
  filename        = "${path.module}/ssh-keys/sf-keypair-${var.environment}.pem"
  file_permission = "0600"
}

# Salvar chave pública em arquivo local (opcional, para referência)
resource "local_file" "public_key" {
  content         = tls_private_key.ssh_key.public_key_openssh
  filename        = "${path.module}/ssh-keys/sf-keypair-${var.environment}.pub"
  file_permission = "0644"
}

# Output com instruções de uso
output "ssh_key_instructions" {
  value       = <<-EOT
  ╔════════════════════════════════════════════════════════════════════════════╗
  ║                         SSH KEY GENERATED                                  ║
  ╠════════════════════════════════════════════════════════════════════════════╣
  ║                                                                            ║
  ║  Private Key Location:                                                     ║
  ║  ${path.module}/ssh-keys/sf-keypair-${var.environment}.pem                           ║
  ║                                                                            ║
  ║  Public Key Location:                                                      ║
  ║  ${path.module}/ssh-keys/sf-keypair-${var.environment}.pub                           ║
  ║                                                                            ║
  ║  To use SSH:                                                               ║
  ║  ssh -i ssh-keys/sf-keypair-${var.environment}.pem ec2-user@<instance-ip>            ║
  ║                                                                            ║
  ║  IMPORTANT: Keep the private key safe and never commit to Git!            ║
  ║                                                                            ║
  ╚════════════════════════════════════════════════════════════════════════════╝
  EOT
  description = "Instructions for using the generated SSH key"
}
