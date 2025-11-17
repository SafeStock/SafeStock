#!/bin/bash
# USER DATA SCRIPT - LOAD BALANCER EC2 (NGINX)
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "==== Load Balancer EC2 User Data - SafeStock ===="
echo "Timestamp: $(date)"

# Variáveis do Terraform
BACKEND_01_IP="${backend_01_ip}"
BACKEND_02_IP="${backend_02_ip}"

# Atualizar sistema
echo "==== Atualizando sistema ===="
yum update -y
yum upgrade -y  # Amazon Linux 2

# Instalar Nginx
echo "==== Instalando Nginx ===="
amazon-linux-extras install -y nginx1
yum install -y curl

# Configurar Nginx como Load Balancer
echo "==== Configurando Nginx Load Balancer ===="
cat > /etc/nginx/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream backend_servers {
        server BACKEND_01_IP:8080;
        server BACKEND_02_IP:8080;
    }

    server {
        listen 80;
        server_name _;

        location / {
            proxy_pass http://backend_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /health {
            access_log off;
            return 200 "Load Balancer OK";
            add_header Content-Type text/plain;
        }
    }
}
EOF

# Substituir IPs no arquivo
sed -i "s/BACKEND_01_IP/$BACKEND_01_IP/g" /etc/nginx/nginx.conf
sed -i "s/BACKEND_02_IP/$BACKEND_02_IP/g" /etc/nginx/nginx.conf

# Testar configuração
nginx -t

# Iniciar Nginx
systemctl enable nginx
systemctl restart nginx

echo "==== Load Balancer configurado com sucesso! ===="
echo "Distribuindo carga entre:"
echo "  - Backend 01: $BACKEND_01_IP:8080"
echo "  - Backend 02: $BACKEND_02_IP:8080"
echo "Acesse: http://$(curl -s ifconfig.me)"