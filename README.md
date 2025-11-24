# 🏪 SafeStock - Sistema de Gerenciamento de Estoque# SafeStock

Projeto de PI Extensão

> Projeto de extensão acadêmica - Gestão inteligente de estoque para creches

## Rodar o projeto localmente

## 🚀 Quick Start (Desenvolvimento Local)

- Docker e Docker Compose

### **Pré-requisitos**

- Docker e Docker Compose instalados### Perfis do Docker Compose (stack completa)

- Git

Na raiz `SafeStock/`, escolha um dos perfis abaixo:

### **1. Clone o repositório**

```bash- **Dois back-ends legados** (stack padrão):

git clone https://github.com/SafeStock/Project-SafeStock-BackEnd.git   ```bash

cd SafeStock   docker compose --profile antigo up --build -d

```   ```

- **Dois back-ends refatorados** (para testes do novo código):

### **2. Suba a aplicação**   ```bash

```bash   docker compose --profile novo up --build -d

docker compose --profile antigo up -d   ```

```

Ambos os perfis sobem MySQL, RabbitMQ e o frontend com balanceamento round-robin entre `api-back-1` e `api-back-2`. Para encerrar e limpar volumes:

### **3. Aguarde inicialização (~2 minutos)**

```bash```bash

docker compose ps  # Verificar statusdocker compose down -v

``````



### **4. Acesse o sistema**### Ordem para inicialização

- **Frontend:** http://localhost:5173

- **Backend API:** http://localhost:80811. **Banco de dados** primeiro (`docker-compose up`)

- **Credenciais:** `francisco@creche.com` / `senha123`2. **Back-end** em seguida (`./mvnw spring-boot:run`)

3. **Front-end** por último (`npm run dev`)

### **5. Para parar**

```bash### 1. Banco de Dados (MySQL via Docker)

docker compose --profile antigo down

```1. Navegue até a pasta do banco de dados:

   ```bash

---   cd DataBase

   ```

## 📁 Estrutura do Projeto

2.Para rodar em segundo plano:

```   ```bash

SafeStock/   docker-compose up -d

├── Back-end/              # Spring Boot 3.4.4   ```

│   ├── src/

│   ├── pom.xml### 2. Back-end (Java Spring Boot)

│   └── Dockerfile

├── Front-end/Plataforma/  # React 18 + Vite1. Navegue até a pasta do back-end:

│   ├── src/   ```bash

│   ├── package.json   cd Back-end

│   └── Dockerfile   ```

├── DataBase/              # MySQL 8.0 setup

├── terraform/             # Infraestrutura AWS2. Execute o back-end no intellj normalmente.

└── docker-compose.yml     # Orquestração local

```### 3. Front-end (React + Vite)



---1. Navegue até a pasta do front-end:

   ```bash

## 🏗️ Arquitetura   cd Front-end/Plataforma

   ```

### **Stack Local:**

```2. Instale as dependências (apenas na primeira vez):

Frontend (Nginx)         :5173   ```bash

    ↓   npm install

Backend A (Spring Boot)  :8081   ```

Backend B (Spring Boot)  :8082

    ↓3. Inicie o front-end:

MySQL 8.0                :3306   ```bash

RabbitMQ 3               :5672   npm run dev

```   ```



### **Tecnologias:**4. O front-end estará disponível em: http://localhost:5173

- **Backend:** Java 17, Spring Boot, Hibernate, JWT, RabbitMQ

- **Frontend:** React 18, Vite, TailwindCSS, Axios

- **Database:** MySQL 8.0 (25 usuários pré-cadastrados)   ```

- **Message Broker:** RabbitMQ com alertas em tempo real

### Comandos úteis para debug:

---

- **Exclusão dos containers e volumesmysql -h 127.0.0.1 -u safestock_app -padmin123 safestockDB:**

## 🔧 Comandos Úteis

  ```bash

### **Ver logs**  docker compose down -v

```bash    ```

docker logs sf-frontend            # Frontend

docker logs sf-backend-antigo      # Backend antigo

docker logs sf-backend-refatorado  # Backend refatorado

docker logs sf-mysql               # Banco de dados  docker-compose logs

docker logs sf-rabbitmq            # Message broker  docker-compose logs mysql    # Apenas MySQL

```  docker-compose logs rabbitmq # Apenas RabbitMQ

  ```

### **Rebuild específico**- **Conectar no container MySQL para debug:**

```bash  ```bash

docker compose build front                    # Rebuild frontend  docker exec -it safestock-mysql mysql -u safestock_user -p

docker compose build back-antigo             # Rebuild backend antigo

docker compose restart back-antigo           # Reiniciar backend antigo

```

### **Limpar e recomeçar**
```bash
docker compose down -v          # Remove tudo incluindo volumes
docker compose --profile antigo up -d --build  # Recria do zero
```

### **Acessar banco de dados**
```bash
docker exec -it sf-mysql mysql -u safestock -p
# Senha: safestock123
```

---

## 🐛 Troubleshooting

### **Erro: porta 8081 já em uso**
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8081 | xargs kill -9
```

### **Frontend não conecta backend**
1. Verificar backend: `docker logs sf-backend-antigo`
2. Verificar MySQL: `docker ps | grep sf-mysql`
3. Testar API: `curl http://localhost:8081/api/funcionarios/login`

### **Containers não sobem**
```bash
docker compose down -v        # Limpar tudo
docker system prune -f        # Limpar cache
docker compose --profile antigo up -d --build
```

---

## 📊 Perfis do Docker Compose

### **Profile: antigo** (padrão)
- Stack completa com backend legado
- 2 backends em modo round-robin
```bash
docker compose --profile antigo up -d
```

### **Profile: novo** (refatorado)
- Stack com código refatorado para testes
```bash
docker compose --profile novo up -d
```

---

## 🌐 Deploy na AWS

Para deploy em produção na AWS, consulte:
- **Arquitetura e Workflow:** [ARQUITETURA-AWS.md](./ARQUITETURA-AWS.md)
- **Guia de deploy:** [terraform/DEPLOY-GUIDE.md](./terraform/DEPLOY-GUIDE.md)

### **Resumo AWS:**
```bash
cd terraform
./scripts/deploy.sh              # Cria infraestrutura
./scripts/configure-env.sh       # Configura IPs automaticamente
cd .. && git push                # Push das configs
cd terraform/scripts && ./update-apps.sh  # Deploy aplicação
```

---

## 📚 Documentação Adicional

- **Quick Start:** Este README
- **Arquitetura AWS:** [ARQUITETURA-AWS.md](./ARQUITETURA-AWS.md)
- **Deploy Terraform:** [terraform/DEPLOY-GUIDE.md](./terraform/DEPLOY-GUIDE.md)
- **Acesso SSH:** [terraform/GUIA-ACESSO-SSH.md](./terraform/GUIA-ACESSO-SSH.md)

---

## 👥 Equipe

Projeto desenvolvido pela equipe SafeStock - SPTech

---

## 📝 Licença

Projeto acadêmico - PI Extensão
