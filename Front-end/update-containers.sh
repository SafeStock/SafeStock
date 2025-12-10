#!/bin/bash
# Script de update para frontend + atualização do Nginx LB backend IP

set -e

# Atualizar repositório
cd /home/ec2-user/SafeStock

echo "Atualizando código fonte..."
git pull

echo "Atualizando containers do frontend..."
docker compose -f docker-compose.frontend.yml --env-file .env down
docker compose -f docker-compose.frontend.yml --env-file .env up -d --build

# Atualizar IP do backend no Nginx LB
BACKEND_IP="$1"
if [ -n "$BACKEND_IP" ]; then
    echo "Atualizando Nginx LB para backend IP: $BACKEND_IP"
    sed "s/__BACKEND_PRIVATE_IP__/$BACKEND_IP/" /home/ec2-user/SafeStock/nginx-loadbalancer.conf | sudo tee /etc/nginx/nginx-loadbalancer.conf > /dev/null
    sudo systemctl restart nginx
    echo "Nginx LB atualizado!"
else
    echo "AVISO: IP do backend não informado. Nginx LB não foi alterado."
fi

echo "Update do frontend concluído."
