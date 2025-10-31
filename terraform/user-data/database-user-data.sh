#!/bin/bash
# USER DATA SCRIPT - DATABASE EC2 (MySQL)
# Logging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Database EC2 User Data - SafeStock ===="
echo "Timestamp: $(date)"

# Variáveis do Terraform
MYSQL_ROOT_PASSWORD="${mysql_root_password}"
MYSQL_APP_PASSWORD="${mysql_app_password}"

# Atualizar sistema
echo "==== Atualizando sistema ===="
apt-get update -y
apt-get upgrade -y

# Instalar MySQL Server
echo "==== Instalando MySQL Server ===="
# Configurar respostas automáticas para instalação
debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_ROOT_PASSWORD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD"

apt-get install -y mysql-server

# Verificar se MySQL está rodando
echo "==== Verificando status do MySQL ===="
systemctl status mysql --no-pager

# Configurar MySQL para aceitar conexões remotas
echo "==== Configurando MySQL para conexões remotas ===="
# Backup da configuração original
cp /etc/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf.backup

# Modificar bind-address
sed -i 's/bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf

# Reiniciar MySQL
systemctl restart mysql

# Aguardar MySQL reiniciar
echo "==== Aguardando MySQL reiniciar ===="
sleep 10

# Configurar banco de dados e usuários
echo "==== Configurando banco de dados SafeStock ===="
mysql -u root -p$MYSQL_ROOT_PASSWORD << EOF
-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS safestock CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Criar usuário para aplicação
CREATE USER IF NOT EXISTS 'safestock'@'%' IDENTIFIED BY '$MYSQL_APP_PASSWORD';
CREATE USER IF NOT EXISTS 'safestock'@'localhost' IDENTIFIED BY '$MYSQL_APP_PASSWORD';

-- Conceder privilégios
GRANT ALL PRIVILEGES ON safestock.* TO 'safestock'@'%';
GRANT ALL PRIVILEGES ON safestock.* TO 'safestock'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Mostrar usuários criados
SELECT user, host FROM mysql.user WHERE user = 'safestock';

-- Mostrar bancos
SHOW DATABASES;
EOF

# Configurar MySQL para performance básica
echo "==== Configurando MySQL para performance ===="
cat >> /etc/mysql/mysql.conf.d/mysqld.cnf << 'EOF'

# SafeStock MySQL Configuration
# Performance tuning for small instance
innodb_buffer_pool_size = 128M
innodb_log_file_size = 32M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# Connection settings
max_connections = 50
connect_timeout = 60
wait_timeout = 600
interactive_timeout = 600

# Query cache (if supported)
query_cache_type = 1
query_cache_size = 16M

# Logging
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
long_query_time = 2

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
EOF

# Reiniciar MySQL com nova configuração
echo "==== Aplicando configurações do MySQL ===="
systemctl restart mysql

# Aguardar MySQL reiniciar
sleep 10

# Testar conexões
echo "==== Testando conexões do banco ===="
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "SELECT 'Root connection OK' as status;"
mysql -u safestock -p$MYSQL_APP_PASSWORD -h localhost -e "SELECT 'App user local connection OK' as status;"

# Configurar backup automático (opcional)
echo "==== Configurando backup automático ===="
mkdir -p /opt/mysql-backups

cat > /opt/mysql-backup.sh << EOF
#!/bin/bash
BACKUP_DIR="/opt/mysql-backups"
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="\$BACKUP_DIR/safestock_backup_\$DATE.sql"

# Criar backup
mysqldump -u root -p$MYSQL_ROOT_PASSWORD safestock > \$BACKUP_FILE

# Comprimir backup
gzip \$BACKUP_FILE

# Manter apenas os últimos 7 dias
find \$BACKUP_DIR -name "safestock_backup_*.sql.gz" -mtime +7 -delete

echo "Backup criado: \${BACKUP_FILE}.gz"
EOF

chmod +x /opt/mysql-backup.sh

# Configurar cron para backup diário às 2h
echo "0 2 * * * root /opt/mysql-backup.sh" >> /etc/crontab

# Criar serviço de monitoramento
echo "==== Criando serviço de monitoramento ===="
cat > /etc/systemd/system/safestock-mysql-monitor.service << 'EOF'
[Unit]
Description=SafeStock MySQL Monitor
After=mysql.service

[Service]
Type=simple
ExecStart=/bin/bash -c 'while true; do sleep 60; mysqladmin ping -h localhost --silent || systemctl restart mysql; done'
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
EOF

# Configurar firewall
echo "==== Configurando firewall ===="
ufw --force enable
ufw allow ssh
ufw allow 3306

# Habilitar serviços
echo "==== Habilitando serviços ===="
systemctl daemon-reload
systemctl enable mysql
systemctl enable safestock-mysql-monitor
systemctl start safestock-mysql-monitor

# Criar script de update (para futuras migrações)
echo "==== Criando scripts de manutenção ===="
cat > /opt/mysql-maintenance.sh << 'EOF'
#!/bin/bash
echo "=== SafeStock MySQL Maintenance ==="

echo "1. Status do MySQL:"
systemctl status mysql --no-pager

echo "2. Uso de espaço:"
du -sh /var/lib/mysql/

echo "3. Conexões ativas:"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "SHOW PROCESSLIST;"

echo "4. Status das tabelas:"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "USE safestock; SHOW TABLE STATUS;"

echo "5. Último backup:"
ls -la /opt/mysql-backups/ | tail -5
EOF

chmod +x /opt/mysql-maintenance.sh

# Status final
echo "==== Status final dos serviços ===="
systemctl status mysql --no-pager
systemctl status safestock-mysql-monitor --no-pager

echo "==== Verificando conectividade ===="
ss -tlnp | grep :3306

echo "==== Database EC2 configurado com sucesso! ===="
echo "MySQL Root Password: [HIDDEN]"
echo "App User: safestock"
echo "Database: safestock"
echo "Para manutenção: sudo /opt/mysql-maintenance.sh"
echo "Para backup manual: sudo /opt/mysql-backup.sh"

# Fazer backup inicial
/opt/mysql-backup.sh