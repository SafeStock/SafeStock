#!/bin/bash
# SAFESTOCK - FRONTEND + CONTAINERS (Docker Compose)
# Logging completo
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== SafeStock Frontend + Containers User Data ===="
echo "Timestamp: $(date)"
echo "==== INÍCIO DA INSTALAÇÃO AUTOMATIZADA ===="

# Variáveis do Terraform
REPOSITORY_URL="${repository_url}"
BACKEND_IP="${backend_ip}"
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)

# Atualizar sistema
echo "==== Atualizando sistema ===="
yum update -y

# Instalar Docker e Nginx
echo "==== Instalando Docker e Nginx ===="
yum install -y docker git
amazon-linux-extras install -y docker
amazon-linux-extras install -y nginx1

# Instalar Docker Compose v2 (plugin)
echo "==== Instalando Docker Compose v2 ===="
mkdir -p /usr/local/lib/docker/cli-plugins
curl -L "https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-linux-$(uname -m)" -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verificar instalação
docker compose version || {
    echo "✗ ERRO: Falha ao instalar Docker Compose"
    exit 1
}

# Iniciar Docker
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user


# Clonar repositório
echo "==== Clonando repositório ===="
cd /home/ec2-user
git clone $REPOSITORY_URL SafeStock || {
    echo "Erro ao clonar repositório"
    exit 1
}
chown -R ec2-user:ec2-user SafeStock

# Remover arquivos e pastas desnecessários para o frontend
cd /home/ec2-user/SafeStock
echo "==== Limpando arquivos desnecessários para EC2 pública (frontend) ===="
rm -rf Backend-Refatorado Backend-Legado DataBase terraform docker-compose.backend.yml docker-compose.yml docker-compose.aws.yml docker-compose.prod.yml
rm -rf SafeStock/Back-end SafeStock/Backend-Legado SafeStock/Backend-Refatorado SafeStock/DataBase SafeStock/terraform
echo "Arquivos desnecessários removidos."

# Buildar frontend - estratégia otimizada
echo "==== Configurando build otimizado ===="
cd /home/ec2-user/SafeStock/Front-end/Plataforma

# Criar arquivo de swap adicional para build
echo "Criando swap adicional..."
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

echo "Memória disponível:"
free -h

# Usar .env.production existente (já configurado para usar /api)
echo "✓ Usando .env.production configurado para proxy /api"

# Build direto no host 
echo "==== Build direto no host ===="

# Instalar Node.js 
if ! command -v node &> /dev/null; then
    curl -fsSL https://rpm.nodesource.com/setup_16.x | bash -
    yum install -y nodejs
fi

# Instalar dependências
npm ci --prefer-offline --no-audit --silent

# Garantir que ec2-user está no grupo docker
sudo usermod -aG docker ec2-user

# Build com configurações otimizadas de memória
export NODE_OPTIONS="--max-old-space-size=1536"
npm run build:prod || {
    echo "Build falhou, tentando com menos memória..."
    export NODE_OPTIONS="--max-old-space-size=1024"
    npm run build:prod
}

# Criar imagem Docker apenas para servir arquivos estáticos
echo "==== Criando imagem Docker otimizada ===="
cat > Dockerfile.static << 'EOF'
FROM nginx:1.27-alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Configurar .env.aws com IP correto
echo "==== Configurando .env.aws ===="
cat > /home/ec2-user/SafeStock/.env.aws << EOF
# Configurações AWS - SafeStock
AWS_EC2_IP=$PUBLIC_IP
EOF

echo "==== Iniciando apenas containers do FRONTEND ===="

cd /home/ec2-user/SafeStock
chown -R ec2-user:ec2-user /home/ec2-user/SafeStock

### Executar frontend e load balancer de produção
sudo docker compose -f docker-compose.frontend.yml --env-file .env.aws up -d --pull always

# Aguardar containers subirem
echo "==== Aguardando containers do frontend iniciarem ===="
sleep 30

# Configurar Nginx como proxy reverso
echo "==== Configurando Nginx como Proxy Reverso ===="
mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
cat > /etc/nginx/sites-available/safestock << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name _;
    
    # Logs
    access_log /var/log/nginx/safestock-access.log;
    error_log /var/log/nginx/safestock-error.log;
    
    # Frontend (React via container)
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Load Balancer para API (distribui entre 8081 e 8082)
    location /api/ {
        # Remove /api/ do path e balanceia entre os 2 backends
        rewrite ^/api/(.*) /$1 break;
        
        # Upstream alternativo simples (nginx faz round-robin)
        proxy_pass http://backend_servers;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With' always;
        
        # Handle preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "Frontend + Load Balancer OK\n";
        add_header Content-Type text/plain;
    }
    
    # Segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    server_tokens off;
}

# Upstream para load balancing dos backends
upstream backend_servers {
    server BACKEND_IP:8081 max_fails=3 fail_timeout=30s;
    server BACKEND_IP:8082 max_fails=3 fail_timeout=30s;
}
EOF

# Substituir IP do Backend
echo "==== Substituindo variáveis ===="
echo "Backend IP: $BACKEND_IP"
if [ -z "$BACKEND_IP" ]; then
    echo "ERRO: BACKEND_IP está vazio!"
    exit 1
fi
sed -i "s|BACKEND_IP|$BACKEND_IP|g" /etc/nginx/sites-available/safestock || {
    echo "ERRO no comando sed!"
    exit 1
}

# Ativar site e remover default
rm -f /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/safestock /etc/nginx/sites-enabled/

# Verificar substituição
echo "Verificando configuração do Nginx:"
grep -n "server.*:808[12]" /etc/nginx/sites-available/safestock || echo "Configuração será verificada após criação do arquivo"

# Configurar nginx.conf para incluir sites-enabled
echo "==== Configurando nginx.conf para incluir sites-enabled ===="
if ! grep -q "sites-enabled" /etc/nginx/nginx.conf; then
    # Adicionar include sites-enabled/* na seção http
    sed -i '/http {/a\    include /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf
    echo "✓ Adicionada linha include sites-enabled/* no nginx.conf"
else
    echo "✓ nginx.conf já inclui sites-enabled"
fi

# Testar configuração do Nginx
echo "==== Testando configuração do Nginx ===="
nginx -t || {
    echo "ERRO na configuração do Nginx!"
    cat /etc/nginx/sites-available/safestock
    exit 1
}

# Criar serviço systemd REAL para gerenciar a aplicação
echo "==== Configurando serviço systemd ===="

cat > /etc/systemd/system/safestock-frontend.service << 'EOF'
[Unit]
Description=SafeStock Frontend Service
After=docker.service network.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=ec2-user
WorkingDirectory=/home/ec2-user/SafeStock
ExecStart=/usr/local/lib/docker/cli-plugins/docker-compose -f docker-compose.frontend.yml --env-file .env.aws up -d
ExecStop=/usr/local/lib/docker/cli-plugins/docker-compose -f docker-compose.frontend.yml --env-file .env.aws down
TimeoutStartSec=300

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

# Criar script de update
echo "==== Criando script de update ===="
git pull origin main
docker compose -f docker-compose.frontend.yml --env-file .env.aws down
docker compose -f docker-compose.frontend.yml --env-file .env.aws up -d --build
systemctl restart nginx
echo "SafeStock atualizado com sucesso!"
cat > /home/ec2-user/update-frontend.sh << 'EOF'
#!/bin/bash
cd /home/ec2-user/SafeStock
git pull origin main
docker compose -f docker-compose.frontend.yml --env-file .env.aws down
docker compose -f docker-compose.frontend.yml --env-file .env.aws up -d --build
systemctl restart nginx
echo "SafeStock atualizado com sucesso!"
EOF

chmod +x /home/ec2-user/update-frontend.sh
chown ec2-user:ec2-user /home/ec2-user/update-frontend.sh

# Verificar status dos serviços
echo "==== Status dos serviços ===="
systemctl status nginx --no-pager
systemctl status safestock-frontend --no-pager

# Aguardar containers subirem
echo "==== Aguardando frontend container ===="
sleep 30

# Teste de conectividade
echo "==== Testando conectividade ===="
curl -s -o /dev/null -w "Frontend container: %%{http_code}\n" http://localhost:5173/
curl -s -o /dev/null -w "Nginx proxy: %%{http_code}\n" http://localhost/
curl -s -o /dev/null -w "Health check: %%{http_code}\n" http://localhost/health

# Informações finais
echo "==== Frontend + Proxy EC2 configurado com sucesso! ===="
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || echo "IP_NAO_DETECTADO")
echo "URL da aplicação: http://$PUBLIC_IP"
echo "URL da API: http://$PUBLIC_IP/api"
echo "Backend IP: $BACKEND_IP"
echo ""
echo "SERVIÇOS RODANDO:"
echo "  - Frontend container: porta 5173"
echo "  - Nginx proxy: porta 80"
echo "  - Load balancer para: $BACKEND_IP:8081 e $BACKEND_IP:8082"
echo ""
echo "ARQUIVOS IMPORTANTES:"
echo "  - Configuração Nginx: /etc/nginx/sites-available/safestock"
echo "  - Script de update: /home/ec2-user/update-frontend.sh"
echo ""
echo "COMANDOS ÚTEIS:"
echo "  - Ver logs user-data: tail -f /var/log/user-data.log"
echo "  - Ver logs nginx: tail -f /var/log/nginx/safestock-error.log"
echo "  - Ver logs container: docker logs sf-frontend"
echo "  - Testar nginx: nginx -t"
echo "  - Reiniciar nginx: systemctl restart nginx"
echo "  - Atualizar: /home/ec2-user/update-frontend.sh"