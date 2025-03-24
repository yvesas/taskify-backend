# Taskify-backend

Taskify is a micro-SaaS for freelancers and small teams to manage tasks. It allows you to create, edit, delete, and view tasks, with basic authentication.
with Nest.js, Prisma, PostgreSQL, React.js, TailwindCSS, ShadcnUI, Docker, Typescript.

- [Look Taskify-frontend](https://github.com/yvesas/taskify-frontend)

---

<div data-badges style="display: flex; gap: 10px;">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
    <img src="https://img.shields.io/badge/prisma-%232D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white" alt="Shadcn/ui" />      
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /> 
    <img src="https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </div>

## **🚀 Como iniciar o projeto**  

#### **1️⃣ Pré-requisitos**
Antes de começar, certifique-se de ter instalado:  
- [Docker e Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js (se for rodar fora do Docker)](https://nodejs.org/)

---

## **2️⃣ Subindo o ambiente com Docker**  
O projeto está separado em **backend** e **frontend**, cada um rodando em um container próprio.  

### **🔹 Rodando o backend**  
1. Navegue até a pasta do backend:  
   ```sh
   cd taskify-backend
   ```
2. Suba os containers:  
   ```sh
   docker compose up -d --build
   ```
   
---

### **3️⃣ Configurando o banco de dados com Prisma**
1. Copie o arquivo de exemplo de variáveis de ambiente:  
   ```sh
   cp .env.example .env
   ```
2. Edite o `.env` e configure a conexão com o banco PostgreSQL:  
   ```env
   DATABASE_URL="postgresql://user:pass@db:5432/db_name"
   ```
3. Aplique as migrations do Prisma:  
   ```sh
   docker compose exec backend pnpm prisma migrate deploy
   ```
4. (Opcional) Gere o cliente do Prisma:  
   ```sh
   docker compose exec backend pnpm prisma generate
   ```

---

### **4️⃣ Acessando o projeto**  
- Backend: [`http://localhost:3000`](http://localhost:3000)  
- Banco de dados (caso queira acessar via **pgAdmin** ou outro cliente SQL):  
  - **Host**: `localhost`
  - **Porta**: `5432`
  - **Usuário**: `user`
  - **Senha**: `pass`
  - **Banco**: `db_name`

---


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
