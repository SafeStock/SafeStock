#!/bin/bash
# FRONT EC2(Nginx + React)
# Logging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Frontend EC2 User Data - SafeStock ===="
echo "Timestamp: $(date)"

# Variáveis do Terraform
REPOSITORY_URL="${repository_url}"
LOAD_BALANCER_IP="${load_balancer_ip}"

# Atualizar sistema
echo "==== Atualizando sistema ===="
yum update -y
yum upgrade -y  # Amazon Linux 2

# Instalar dependências
echo "==== Instalando dependências ===="
amazon-linux-extras install -y nginx1
yum install -y \
    curl \
    wget \
    git \
    unzip

# Instalar Node.js 16 (compatível com Amazon Linux 2 GLIBC 2.26)
echo "==== Instalando Node.js via NVM ===="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 16
nvm use 16

# Verificar instalação
node --version
npm --version

# Tornar node disponível globalmente
ln -sf "$NVM_DIR/versions/node/$(nvm current)/bin/node" /usr/bin/node
ln -sf "$NVM_DIR/versions/node/$(nvm current)/bin/npm" /usr/bin/npm

# Configurar diretório do frontend
echo "==== Configurando diretório do frontend ===="
mkdir -p /usr/share/nginx/html/safestock
cd /usr/share/nginx/html/safestock

# Clonar repositório
echo "==== Clonando repositório ===="
git clone $REPOSITORY_URL temp-repo || {
    echo "Erro ao clonar repositório"
    exit 1
}

# Verificar estrutura do repositório
echo "==== Verificando estrutura do repositório ===="
ls -la temp-repo/
ls -la temp-repo/SafeStock/ || true

# Copiar arquivos do frontend (corrigindo caminho)
if [ -d "temp-repo/SafeStock/Front-end/Plataforma" ]; then
    echo "Estrutura padrão encontrada"
    cp -r temp-repo/SafeStock/Front-end/Plataforma/* .
elif [ -d "temp-repo/Front-end/Plataforma" ]; then
    echo "Estrutura alternativa encontrada"
    cp -r temp-repo/Front-end/Plataforma/* .
else
    echo "ERRO: Estrutura do repositório não encontrada!"
    echo "Conteúdo disponível:"
    find temp-repo -type d -name "Plataforma"
    exit 1
fi

rm -rf temp-repo

# Instalar dependências do projeto
echo "==== Instalando dependências do projeto ===="
export NODE_OPTIONS="--max-old-space-size=2048"
npm install || {
    echo "Erro ao instalar dependências"
    echo "Tentando com --legacy-peer-deps"
    npm install --legacy-peer-deps
}

# Build do projeto React
echo "==== Fazendo build do projeto ===="
npm run build || {
    echo "Erro no build"
    echo "Verificando package.json:"
    cat package.json | grep -A 5 '"scripts"'
    exit 1
}

# Verificar se o build foi criado
if [ -d "dist" ]; then
    echo "Build encontrado em dist/"
    ls -la dist/
    # Mover build para diretório do Nginx
    rm -rf /usr/share/nginx/html/safestock/*
    cp -r dist/* /usr/share/nginx/html/safestock/
elif [ -d "build" ]; then
    echo "Build encontrado em build/"
    ls -la build/
    # Mover build para diretório do Nginx
    rm -rf /usr/share/nginx/html/safestock/*
    cp -r build/* /usr/share/nginx/html/safestock/
else
    echo "ERRO: Diretório de build não encontrado!"
    exit 1
fi

cd /usr/share/nginx/html/safestock

# Configurar Nginx
echo "==== Configurando Nginx ===="
cat > /etc/nginx/conf.d/safestock.conf << 'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html/safestock;
    index index.html;

    # Logs
    access_log /var/log/nginx/safestock-access.log;
    error_log /var/log/nginx/safestock-error.log;

    # Configuração para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy para API (Load Balancer)
    location /api/ {
        proxy_pass http://LOAD_BALANCER_IP/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "Frontend OK";
        add_header Content-Type text/plain;
    }

    # Segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    server_tokens off;
}
EOF

# Substituir IP do Load Balancer
echo "==== Substituindo variáveis ===="
echo "Load Balancer IP: $LOAD_BALANCER_IP"
sed -i "s|LOAD_BALANCER_IP|$LOAD_BALANCER_IP|g" /etc/nginx/conf.d/safestock.conf

# Verificar substituição
echo "Verificando configuração do Nginx:"
grep -n "proxy_pass" /etc/nginx/conf.d/safestock.conf || echo "Nenhum proxy_pass encontrado"

# Remover configuração default
rm -f /etc/nginx/conf.d/default.conf

# Testar configuração do Nginx
echo "==== Testando configuração do Nginx ===="
nginx -t || {
    echo "ERRO na configuração do Nginx!"
    cat /etc/nginx/conf.d/safestock.conf
    exit 1
}

# Criar serviço systemd para gerenciar a aplicação
echo "==== Configurando serviço systemd ===="
cat > /etc/systemd/system/safestock-frontend.service << 'EOF'
[Unit]
Description=SafeStock Frontend Service
After=network.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/true

[Install]
WantedBy=multi-user.target
EOF

# Substituir IP do Load Balancer
sed -i "s|LOAD_BALANCER_IP|$LOAD_BALANCER_IP|g" /etc/nginx/conf.d/safestock.conf

# Iniciar serviços
echo "==== Iniciando serviços ===="
systemctl daemon-reload
systemctl enable nginx
systemctl enable safestock-frontend
systemctl restart nginx
systemctl start safestock-frontend

# Aguardar Nginx iniciar
sleep 3

# Verificar se Nginx está rodando
if systemctl is-active --quiet nginx; then
    echo "✓ Nginx está rodando"
else
    echo "✗ ERRO: Nginx não está rodando!"
    systemctl status nginx --no-pager
    exit 1
fi

# Criar script de update para futuras atualizações
echo "==== Criando script de update ===="
cat > /opt/update-frontend.sh << 'UPDATEEOF'
#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 16

cd /tmp
rm -rf temp-update
git clone REPOSITORY_URL temp-update
cd temp-update/SafeStock/Front-end/Plataforma || cd temp-update/Front-end/Plataforma
npm install
npm run build
rm -rf /usr/share/nginx/html/safestock/*
cp -r dist/* /usr/share/nginx/html/safestock/ || cp -r build/* /usr/share/nginx/html/safestock/
systemctl restart nginx
echo "Frontend atualizado com sucesso!"
UPDATEEOF

# Substituir URL do repositório no script
sed -i "s|REPOSITORY_URL|$REPOSITORY_URL|g" /opt/update-frontend.sh
chmod +x /opt/update-frontend.sh

# Verificar status dos serviços
echo "==== Status dos serviços ===="
systemctl status nginx --no-pager
systemctl status safestock-frontend --no-pager

# Verificar conteúdo do frontend
echo "==== Verificando conteúdo frontend ===="
ls -lh /usr/share/nginx/html/safestock/ | head -20
echo "..."
echo "Total de arquivos: $(find /usr/share/nginx/html/safestock -type f | wc -l)"

# Teste de conectividade
echo "==== Testando conectividade ===="
curl -s -o /dev/null -w "HTTP Status: %%{http_code}\n" http://localhost/
curl -s -o /dev/null -w "Health check: %%{http_code}\n" http://localhost/health

# Informações finais
echo "==== Frontend EC2 configurado com sucesso! ===="
PUBLIC_IP=$(curl -s ifconfig.me)
echo "URL: http://$PUBLIC_IP"
echo "Diretório: /usr/share/nginx/html/safestock"
echo "Configuração Nginx: /etc/nginx/conf.d/safestock.conf"
echo "Logs Nginx:"
echo "  - Access: /var/log/nginx/safestock-access.log"
echo "  - Error: /var/log/nginx/safestock-error.log"
echo "  - User Data: /var/log/user-data.log"
echo "Load Balancer: $LOAD_BALANCER_IP"
echo "Script de update: /opt/update-frontend.sh"
echo ""
echo "COMANDOS ÚTEIS:"
echo "  - Ver logs user-data: tail -f /var/log/user-data.log"
echo "  - Ver logs nginx: tail -f /var/log/nginx/safestock-error.log"
echo "  - Testar nginx: nginx -t"
echo "  - Reiniciar nginx: systemctl restart nginx"
echo "  - Atualizar frontend: /opt/update-frontend.sh"