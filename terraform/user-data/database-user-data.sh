#!/bin/bash
# USER DATA SCRIPT - DATABASE EC2 SIMPLIFICADO
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Database EC2 User Data - SafeStock (Simplificado) ===="
echo "Timestamp: $(date)"

# Variáveis
MYSQL_ROOT_PASSWORD="${mysql_root_password}"
MYSQL_APP_PASSWORD="${mysql_app_password}"

# Atualizar sistema
echo "==== Atualizando sistema ===="
apt-get update -y
apt-get upgrade -y

# Instalar MySQL Server
echo "==== Instalando MySQL Server ===="
debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_ROOT_PASSWORD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD"
apt-get install -y mysql-server

# Configurar MySQL
echo "==== Configurando MySQL ===="
sed -i 's/bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
systemctl restart mysql

# Configurar banco e usuário
mysql -u root -p$MYSQL_ROOT_PASSWORD << EOF
CREATE DATABASE IF NOT EXISTS safestock;
CREATE USER IF NOT EXISTS 'safestock'@'%' IDENTIFIED BY '$MYSQL_APP_PASSWORD';
GRANT ALL PRIVILEGES ON safestock.* TO 'safestock'@'%';
FLUSH PRIVILEGES;
EOF

# Configurar firewall
ufw --force enable
ufw allow ssh
ufw allow 3306

# Status
systemctl status mysql --no-pager

echo "==== Database EC2 configurado com sucesso! ===="
echo "MySQL rodando na porta 3306"
echo "Database: safestock | User: safestock"