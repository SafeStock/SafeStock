FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copia arquivos do Maven
COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn

# Download de dependências
RUN mvn dependency:go-offline -B

# Copia código fonte
COPY src ./src

# Build da aplicação
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine

# Instala netcat para verificar se MySQL está pronto
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

# Copia o JAR construído
COPY --from=build /app/target/*.jar app.jar

# Copia o script de entrada
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Variáveis de ambiente padrão
ENV JAVA_OPTS="-Xmx512m"
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=90s --retries=5 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]

