#!/bin/sh
set -e

echo "[$(date)] =========================================="
echo "[$(date)] Iniciando Load Balancer SafeStock"
echo "[$(date)] =========================================="

# Validar se BACKEND_UPSTREAM foi definida
if [ -z "$BACKEND_UPSTREAM" ]; then
    echo "[$(date)] ❌ ERRO: Variável BACKEND_UPSTREAM não está definida!"
    echo "[$(date)] Esta variável deve ser passada via docker-compose.yml"
    exit 1
fi

echo "[$(date)] ✅ BACKEND_UPSTREAM definida: $BACKEND_UPSTREAM"

# Substituir variáveis no template
echo "[$(date)] Processando configuração do Nginx..."
envsubst '${BACKEND_UPSTREAM}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Validar sintaxe do Nginx
echo "[$(date)] Validando configuração do Nginx..."
if nginx -t 2>&1 | grep -q "successful"; then
    echo "[$(date)] ✅ Configuração do Nginx validada com sucesso"
else
    echo "[$(date)] ❌ ERRO na configuração do Nginx:"
    nginx -t
    exit 1
fi

# Mostrar configuração final (para debug)
echo "[$(date)] Configuração dos backends:"
grep -A 5 "upstream backend_servers" /etc/nginx/conf.d/default.conf

echo "[$(date)] =========================================="
echo "[$(date)] ✅ Load Balancer pronto!"
echo "[$(date)] =========================================="

# Iniciar Nginx
exec nginx -g "daemon off;"