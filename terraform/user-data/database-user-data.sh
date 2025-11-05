#!/bin/bash
# USER DATA SCRIPT - DATABASE EC2 - MySQL 8.0 (Amazon Linux 2)
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Database EC2 User Data - SafeStock - MySQL 8.0 (Amazon Linux 2) ===="
echo "Timestamp: $(date)"

# Variáveis
MYSQL_ROOT_PASSWORD="${mysql_root_password}"
MYSQL_APP_PASSWORD="${mysql_app_password}"

# Validar variáveis obrigatórias
if [ -z "$MYSQL_ROOT_PASSWORD" ] || [ -z "$MYSQL_APP_PASSWORD" ]; then
    echo "ERRO: Variáveis de senha não foram fornecidas pelo Terraform"
    echo "MYSQL_ROOT_PASSWORD está vazio: $([ -z "$MYSQL_ROOT_PASSWORD" ] && echo 'SIM' || echo 'NÃO')"
    echo "MYSQL_APP_PASSWORD está vazio: $([ -z "$MYSQL_APP_PASSWORD" ] && echo 'SIM' || echo 'NÃO')"
    exit 1
fi

echo "✓ Variáveis validadas com sucesso"

# Aguardar conectividade com a internet (NAT Gateway pode levar tempo)
echo "==== Aguardando conectividade com a internet ===="
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s --connect-timeout 5 https://aws.amazon.com > /dev/null; then
        echo " Conectividade estabelecida após $RETRY_COUNT tentativas"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Aguardando internet... tentativa $RETRY_COUNT de $MAX_RETRIES"
    sleep 10
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "ERRO: Não foi possível estabelecer conectividade"
    exit 1
fi

# Atualizar sistema
echo "==== Atualizando sistema ===="
yum update -y || {
    sleep 30
    yum clean all
    yum update -y
}

# Instalar MySQL 8.0 Community Server
echo "==== Instalando MySQL 8.0 Community Server ===="
wget https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm || {
    echo "ERRO: Falha ao baixar MySQL repo"
    exit 1
}

rpm -Uvh mysql80-community-release-el7-7.noarch.rpm || {
    echo "ERRO: Falha ao instalar MySQL repo"
    exit 1
}

# Importar chave GPG do MySQL
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

yum install -y mysql-community-server || {
    echo "ERRO: Falha ao instalar MySQL server"
    yum clean all
    yum install -y mysql-community-server
}

echo "✓ MySQL 8.0 Community Server instalado"

# Iniciar e habilitar MySQL
echo "==== Iniciando MySQL 8.0 ===="
systemctl enable mysqld
systemctl start mysqld

# Aguardar serviço inicializar completamente
echo "Aguardando MySQL inicializar..."
sleep 30

# Verificar se está rodando
RETRY=0
MAX_RETRY=10
while [ $RETRY -lt $MAX_RETRY ]; do
    if systemctl is-active --quiet mysqld; then
        echo "✓ MySQL 8.0 está rodando"
        break
    fi
    RETRY=$((RETRY + 1))
    echo "Tentativa $RETRY/$MAX_RETRY - Aguardando MySQL..."
    sleep 5
done

if ! systemctl is-active --quiet mysqld; then
    echo "ERRO: MySQL não iniciou após $MAX_RETRY tentativas"
    systemctl status mysqld --no-pager
    journalctl -u mysqld -n 50 --no-pager
    exit 1
fi

# Obter senha temporária
echo "==== Configurando senha root ===="
echo "Procurando senha temporária no log..."
sleep 5  # Garantir que o log foi escrito

TEMP_PASSWORD=$(grep 'temporary password' /var/log/mysqld.log | tail -1 | awk '{print $NF}')

if [ -z "$TEMP_PASSWORD" ]; then
    echo "ERRO: Senha temporária não encontrada no log"
    echo "Conteúdo do log mysqld.log:"
    tail -50 /var/log/mysqld.log
    exit 1
fi

echo "✓ Senha temporária obtida"

# Alterar senha root (SINTAXE CORRIGIDA)
echo "Alterando senha root..."
mysql --connect-expired-password -u root -p"$TEMP_PASSWORD" << EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';
FLUSH PRIVILEGES;
EOF

if [ $? -eq 0 ]; then
    echo "✓ Senha root configurada com sucesso"
else
    echo "ERRO: Falha ao alterar senha root"
    exit 1
fi

# Configurar MySQL para aceitar conexões remotas
echo "==== Configurando acesso remoto ===="
cat >> /etc/my.cnf << 'MYSQL_CONFIG'

# SafeStock Configuration
[mysqld]
bind-address = 0.0.0.0
default-authentication-plugin = mysql_native_password
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
max_connections = 200
MYSQL_CONFIG

echo "✓ Configuração adicionada ao /etc/my.cnf"
echo "Reiniciando MySQL..."

systemctl restart mysqld
sleep 20

# Verificar se está rodando após restart
RETRY=0
MAX_RETRY=10
while [ $RETRY -lt $MAX_RETRY ]; do
    if systemctl is-active --quiet mysqld; then
        echo "✓ MySQL reiniciado com sucesso"
        break
    fi
    RETRY=$((RETRY + 1))
    echo "Tentativa $RETRY/$MAX_RETRY - Aguardando MySQL..."
    sleep 5
done

if ! systemctl is-active --quiet mysqld; then
    echo "ERRO: MySQL falhou após restart"
    systemctl status mysqld --no-pager
    journalctl -u mysqld -n 50 --no-pager
    cat /etc/my.cnf
    exit 1
fi

# Criar banco de dados e usuário
echo "==== Criando banco de dados e usuário ===="
mysql -u root -p"$MYSQL_ROOT_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS safestock CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'safestock'@'%' IDENTIFIED WITH mysql_native_password BY '$MYSQL_APP_PASSWORD';
CREATE USER IF NOT EXISTS 'safestock'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_APP_PASSWORD';
GRANT ALL PRIVILEGES ON safestock.* TO 'safestock'@'%';
GRANT ALL PRIVILEGES ON safestock.* TO 'safestock'@'localhost';
FLUSH PRIVILEGES;
SHOW DATABASES;
SELECT User, Host FROM mysql.user WHERE User='safestock';
EOF

if [ $? -eq 0 ]; then
    echo " Database 'safestock' e usuário criados"
else
    echo "ERRO: Falha ao criar database ou usuário"
    exit 1
fi

# Status final
echo "==== Status final ===="
echo "MySQL Version:"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "SELECT VERSION();" || echo "Falha ao obter versão"

echo ""
echo "Databases:"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "SHOW DATABASES;" || echo "Falha ao listar databases"

echo ""
echo "Status do serviço:"
systemctl status mysqld --no-pager

echo ""
echo "Porta MySQL:"
ss -tlnp | grep 3306 || netstat -tlnp | grep 3306

echo ""
echo "==== Database EC2 configurado com sucesso! ===="
echo "MySQL Version: 8.0"
echo "Porta: 3306"
echo "Database: safestock"
echo "Usuário: safestock"
echo "IP Privado: $(hostname -I | awk '{print $1}')"
echo ""
echo "COMANDOS ÚTEIS:"
echo "  - Ver logs user-data: tail -f /var/log/user-data.log"
echo "  - Ver logs MySQL: tail -f /var/log/mysqld.log"
echo "  - Conectar MySQL: mysql -u root -p"
echo "  - Status MySQL: systemctl status mysqld"
echo "  - Reiniciar MySQL: systemctl restart mysqld"