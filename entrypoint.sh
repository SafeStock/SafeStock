#!/bin/sh
set -e

echo "BACKEND_UPSTREAM=${BACKEND_UPSTREAM}"

# Substituir variáveis no template
envsubst '${BACKEND_UPSTREAM}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Executar nginx
exec nginx -g "daemon off;"
