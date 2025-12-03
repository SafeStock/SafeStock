#!/bin/sh
set -e

echo "🔍 Aguardando MySQL estar disponível..."

# Extrai o host do MySQL da URL de conexão
MYSQL_HOST=$(echo $SPRING_DATASOURCE_URL | sed 's/.*:\/\/\([^:]*\):.*/\1/')
MYSQL_PORT=3306

# Aguarda o MySQL estar pronto
until nc -z $MYSQL_HOST $MYSQL_PORT; do
  echo "⏳ MySQL ainda não está pronto - aguardando..."
  sleep 2
done

echo "✅ MySQL está pronto!"

# Aguarda mais 5 segundos para garantir que o MySQL está completamente inicializado
sleep 5

echo "🚀 Iniciando aplicação Spring Boot..."
exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar app.jar
