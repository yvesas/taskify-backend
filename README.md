# Taskify-backend

Taskify is a micro-SaaS for freelancers and small teams to manage tasks. It allows you to create, edit, delete, and view tasks, with basic authentication.
with Nest.js, Prisma, PostgreSQL, React.js, TailwindCSS, ShadcnUI, Docker, Typescript.

- Projeto completo: [Taskify-project](https://github.com/yvesas/taskify-project)
- [ Taskify-frontend](https://github.com/yvesas/taskify-frontend)

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

### **Pré-requisitos**

Antes de começar, certifique-se de ter instalado:

- [Docker e Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js (se for rodar fora do Docker)](https://nodejs.org/)

---

### **Subindo o ambiente com Docker**

Acesse o projeto completo e suba os container

1. Clone o projeto completo:
   [Taskify-project](https://github.com/yvesas/taskify-project)
2. Suba os containers:
   ```sh
   docker compose up -d --build
   ```

---

### **Subindo local sem docker**

1. Instale as denpedências

   ```
   pnpm i
   ```

2. Copie o arquivo de exemplo de variáveis de ambiente:

   ```sh
   cp .env.example .env
   ```

3. Edite o `.env` e configure a conexão com o banco PostgreSQL.
   Ou utilize a que já está definida.

   ```env
   DATABASE_URL="postgresql://user:pass@db:5432/db_name"
   ```

4. Aplique as migrations do Prisma:

   ```sh
   pnpm prisma migrate deploy
   ```

5. (Opcional) Gere o cliente do Prisma:

   ```sh
   pnpm prisma generate
   ```

---

### **Acessando o projeto**

- Backend: [`http://localhost:3000`](http://localhost:3000)
- Banco de dados (caso queira acessar via **pgAdmin** ou outro cliente SQL):
  - **Host**: `localhost`
  - **Porta**: `5432`
  - **Usuário**: `bond`
  - **Senha**: `jamesbond007`
  - **Banco**: `taskify`
