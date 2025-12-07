# ================================================================
# BACKUP AUTOMÁTICO - EBS SNAPSHOTS (AWS Data Lifecycle Manager)
# ================================================================
# Configuração de backup automático usando snapshots nativos da AWS
# - Backup diário às 3 AM UTC (meia-noite horário de Brasília)
# - Retenção de 7 dias (última semana)
# - Custo estimado: ~$7/mês para volume de 20GB
# ================================================================

## DLM Lifecycle Policy para snapshots automáticos do volume da EC2 backend
# resource "aws_dlm_lifecycle_policy" "sf_backup_policy_backend" {
#   description        = "SafeStock automatic backup backend volume"
#   execution_role_arn = aws_iam_role.sf_dlm_lifecycle_role.arn
#   state              = "ENABLED"
#
#   policy_details {
#     resource_types = ["VOLUME"]
#
#     schedule {
#       name = "Daily backup at 3 AM UTC"
#
#       create_rule {
#         interval      = 24
#         interval_unit = "HOURS"
#         times         = ["03:00"] # 3 AM UTC = Meia-noite horário de Brasília
#       }
#
#       retain_rule {
#         count = 7 # Mantém últimos 7 dias de backup
#       }
#
#       tags_to_add = {
#         SnapshotType = "DLM-Auto-Backup"
#         Service      = "SafeStock-MySQL"
#       }
#
#       copy_tags = true
#     }
#
#     target_tags = {
#       Name = "sf-ec2-backend-containers"
#       Type = "Backend-Database-Queue"
#     }
#   }
#
#   tags = {
#     Name = "sf-dlm-backup-policy"
#   }
# }
#
# IAM Role para DLM executar snapshots
# resource "aws_iam_role" "sf_dlm_lifecycle_role" {
#   name = "sf-dlm-lifecycle-role"
#
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "dlm.amazonaws.com"
#         }
#       }
#     ]
#   })
#
#   tags = {
#     Name = "sf-dlm-lifecycle-role"
#   }
# }
#
# Policy para permitir DLM criar e gerenciar snapshots
# resource "aws_iam_role_policy" "sf_dlm_lifecycle_policy" {
#   name = "sf-dlm-lifecycle-policy"
#   role = aws_iam_role.sf_dlm_lifecycle_role.id
#
#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Action = [
#           "ec2:CreateSnapshot",
#           "ec2:CreateSnapshots",
#           "ec2:DeleteSnapshot",
#           "ec2:DescribeInstances",
#           "ec2:DescribeVolumes",
#           "ec2:DescribeSnapshots",
#           "ec2:EnableFastSnapshotRestores",
#           "ec2:DescribeFastSnapshotRestores",
#           "ec2:DisableFastSnapshotRestores",
#           "ec2:CopySnapshot",
#           "ec2:ModifySnapshotAttribute",
#           "ec2:DescribeSnapshotAttribute"
#         ]
#         Resource = "*"
#       },
#       {
#         Effect = "Allow"
#         Action = [
#           "ec2:CreateTags"
#         ]
#         Resource = "arn:aws:ec2:*::snapshot/*"
#       }
#     ]
#   })
# }
