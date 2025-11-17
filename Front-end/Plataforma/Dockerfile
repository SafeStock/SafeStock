# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Argumento para definir o ambiente (dev ou prod)
ARG BUILD_MODE=dev

COPY package*.json ./
COPY dayjs-1.11.10.tgz ./
RUN npm ci
COPY . .

# Build usando o modo especificado (build:dev ou build:prod)
RUN npm run build:${BUILD_MODE}

# Runtime stage
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
