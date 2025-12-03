# Back-end

Esta pasta mantém o backend legado do SafeStock. A orquestração Docker fica na raiz do repositório (`SafeStock/docker-compose.yml`).

## Executando com Docker Compose

O arquivo `docker-compose.yml` está configurado com perfis para que você escolha qual backend subir:
- `antigo`: sobe o backend legado localizado em `SafeStock/Back-end`.
- `novo`: sobe o backend refatorado que fica em `Back-SafeStock/Project-SafeStock-BackEnd/Back-end` (pasta paralela a `SafeStock`).
Outros serviços (MySQL e RabbitMQ) sobem sempre que um perfil é ativado.

O front-end está containerizado como serviço `front` e sobe automaticamente sempre que você iniciar o compose. Ele entrega a build do Vite via Nginx na porta `5173`.

### Comandos úteis

- Subir o backend antigo (rode a partir da pasta `SafeStock/`):
	```powershell
	docker compose --profile antigo up -d --build
	```
- Subir o backend novo (certifique-se de que o repositório está em `../Back-SafeStock/Project-SafeStock-BackEnd/Back-end` e que o Dockerfile expõe a porta 8080):
	```powershell
	docker compose --profile novo up -d --build
	```
- Acessar o front-end (já sobe com qualquer comando acima): http://localhost:5173
- Derrubar tudo antes de alternar entre perfis:
	```powershell
	docker compose down
	```
- Subir apenas o banco (útil para testes locais):
	```powershell
	docker compose up mysql -d
	```

> Como o front-end aponta para `http://localhost:8080`, apenas um backend deve estar rodando por vez. Derrube (`docker compose down`) antes de trocar de perfil para evitar conflitos de porta e garantir rebuild limpo.