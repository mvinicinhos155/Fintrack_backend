# 💳 FinTrack API

Backend da aplicação **FinTrack**, um sistema bancário desenvolvido para simular operações financeiras de forma segura e eficiente.

O projeto foi criado com o objetivo de praticar o desenvolvimento de APIs REST utilizando **TypeScript**, autenticação com **JWT**, banco de dados **PostgreSQL** executando em **Docker** e o ORM **Prisma**.

---

## 🚀 Funcionalidades

- 👤 Cadastro de usuários
- 🔐 Login com autenticação JWT
- 🔒 Criptografia de senhas com BCrypt
- 💰 Depósito em conta
- 💸 Transferências entre usuários
- 📜 Histórico de transações
- 🛡️ Rotas protegidas por autenticação
- ✅ Validação de dados

---

# 🛠 Tecnologias Utilizadas

- TypeScript
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker
- JWT (JSON Web Token)
- BCrypt
- Dotenv
- Cors

---

# 📂 Estrutura do Projeto

```
src
│
├── controllers
│   ├── historico.ts
│   ├── login.ts
│   ├── transfer.ts
│   └── users.ts
│
├── lib
│
├── middlewares
│
├── router
│
├── app.ts
└── server.ts

prisma
│
├── schema.prisma

docker-compose.yml
```

---

# 🏗 Arquitetura

```
Frontend (React)
        │
        ▼
 REST API (Express + TypeScript)
        │
        ▼
      Prisma ORM
        │
        ▼
 PostgreSQL (Docker)
```

---

# ⚙️ Instalação

Clone o repositório

```bash
git clone https://github.com/mvinicinhos155/Fintrack_backend
```

Entre na pasta

```bash
cd fintrack
```

Instale as dependências

```bash
npm install
```

---

# 🔑 Variáveis de Ambiente

Crie um arquivo `.env`

```env
PORT=3000

DATABASE_URL="postgresql://postgres:SENHA@localhost:5432/fintrack"

JWT_SECRET=sua_chave_secreta
```

---

# 🐳 Banco de Dados

O projeto utiliza **PostgreSQL** executando em um container Docker.

Para iniciar o banco execute:

```bash
docker compose up -d
```

Caso deseje parar o container:

```bash
docker compose down
```

---

# ▶️ Executando o Projeto

Modo desenvolvimento

```bash
npm run dev
```

Gerar build

```bash
npm run build
```

Executar versão compilada

```bash
npm start
```

---

# 📦 Prisma

Gerar o Client

```bash
npx prisma generate
```

Aplicar alterações no banco

```bash
npx prisma db push
```

Abrir Prisma Studio

```bash
npx prisma studio
```

---


# 📌 Principais Funcionalidades

- Cadastro de usuários
- Login
- Depósito
- Transferências
- Histórico de movimentações

---

# 🎯 Objetivo

Este projeto foi desenvolvido para consolidar conhecimentos em:

- Desenvolvimento Backend com TypeScript
- Criação de APIs REST
- Prisma ORM
- PostgreSQL
- Docker
- Autenticação JWT
- Criptografia de Senhas
- Organização de projetos Node.js
- Integração entre Frontend e Backend
