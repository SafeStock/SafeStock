# Requisitos para rodar localmente

1. Instale dependências:
	```bash
	npm install tailwindcss @tailwindcss/vite
	npm install react-router-dom
	```

# Build e Deploy em Produção (AWS)

O build de produção é feito automaticamente via script de user-data na EC2, usando `.env.production` (com `VITE_API_BASE_URL=/api`).

**Para atualizar o frontend em produção:**

1. Faça push das alterações para o GitHub (branch main).
2. Na EC2 do frontend, execute:
	```bash
	/home/ec2-user/update-frontend.sh
	```
	Isso irá:
	- Puxar o código mais recente do GitHub
	- Fazer o build de produção (`npm run build:prod`)
	- Subir/reiniciar os containers frontend e Nginx

**Importante:**
- O arquivo `.env.production` já está configurado para usar `/api` como base das requisições.
- O Nginx faz o proxy reverso `/api` para o backend automaticamente.

---