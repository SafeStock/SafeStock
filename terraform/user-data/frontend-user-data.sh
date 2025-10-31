#!/bin/bash
# FRONT EC2(Nginx + React)
# Logging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Frontend EC2 User Data - SafeStock ===="
echo "Timestamp: $(date)"

# Variáveis do Terraform
REPOSITORY_URL="${repository_url}"
ALB_DNS_NAME="${alb_dns_name}"

# Atualizar sistema
echo "==== Atualizando sistema ===="
apt-get update -y
apt-get upgrade -y

# Instalar dependências
echo "==== Instalando dependências ===="
apt-get install -y \
    curl \
    wget \
    git \
    nginx \
    unzip \
    software-properties-common

# Instalar Node.js 18 (para build do frontend se necessário)
echo "==== Instalando Node.js ===="
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Criar diretório da aplicação
echo "==== Preparando diretório da aplicação ===="
mkdir -p /opt/safestock
cd /opt

# Clonar repositório
echo "==== Clonando repositório SafeStock ===="
git clone $REPOSITORY_URL safestock
cd safestock

# Copiar arquivos do frontend para nginx
echo "==== Configurando frontend ===="
if [ -d "build-output/frontend" ]; then
    echo "Usando build pré-compilado"
    cp -r build-output/frontend/* /var/www/html/
else
    echo "Build não encontrado, compilando frontend..."
    cd Front-end/Plataforma
    
    # Atualizar .env.production com DNS do ALB
    echo "VITE_API_BASE_URL=http://$ALB_DNS_NAME" > .env.production
    
    # Instalar dependências e fazer build
    npm install
    npm run build
    
    # Copiar arquivos compilados
    cp -r dist/* /var/www/html/
    cd /opt/safestock
fi

# Configurar Nginx
echo "==== Configurando Nginx ===="
cat > /etc/nginx/sites-available/safestock << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html;

    # Logs
    access_log /var/log/nginx/safestock.access.log;
    error_log /var/log/nginx/safestock.error.log;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Frontend - serve arquivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
        expires 1d;
        add_header Cache-Control "public, immutable";
    }

    # Cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Remover header do servidor
    server_tokens off;
}
EOF

# Ativar site
ln -sf /etc/nginx/sites-available/safestock /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Testar configuração do Nginx
nginx -t

# Criar serviço systemd para gerenciar a aplicação
echo "==== Configurando serviço systemd ===="
cat > /etc/systemd/system/safestock-frontend.service << 'EOF'
[Unit]
Description=SafeStock Frontend Service
After=network.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/bin/bash -c '/bin/kill -s HUP $(/bin/cat /run/nginx.pid)'
ExecStop=/bin/bash -c '/bin/kill -s QUIT $(/bin/cat /run/nginx.pid)'
KillMode=mixed

[Install]
WantedBy=multi-user.target
EOF

# Habilitar e iniciar serviços
echo "==== Iniciando serviços ===="
systemctl daemon-reload
systemctl enable nginx
systemctl enable safestock-frontend
systemctl start nginx
systemctl start safestock-frontend

# Configurar firewall básico
echo "==== Configurando firewall ===="
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'

# Criar script de update para futuras atualizações
echo "==== Criando script de update ===="
cat > /opt/update-frontend.sh << 'EOF'
#!/bin/bash
echo "Atualizando Frontend SafeStock..."
cd /opt/safestock

# Backup do frontend atual
cp -r /var/www/html /var/www/html.backup.$(date +%Y%m%d_%H%M%S)

# Atualizar repositório
git pull origin main

# Atualizar frontend
if [ -d "build-output/frontend" ]; then
    cp -r build-output/frontend/* /var/www/html/
else
    cd Front-end/Plataforma
    npm install
    npm run build
    cp -r dist/* /var/www/html/
fi

# Recarregar nginx
systemctl reload nginx
echo "Frontend atualizado com sucesso!"
EOF

chmod +x /opt/update-frontend.sh

# Status final
echo "==== Status dos serviços ===="
systemctl status nginx --no-pager
systemctl status safestock-frontend --no-pager

echo "==== Frontend EC2 configurado com sucesso! ===="
echo "URL: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "Para atualizar: sudo /opt/update-frontend.sh"