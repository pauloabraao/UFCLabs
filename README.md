# UFC Labs System 

Sistema de Gestão de Laboratórios Acadêmicos da UFC.

## Sumário

- [Descrição](#descrição)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Como Rodar o Servidor (Backend)](#como-rodar-o-servidor-backend)
- [Como Rodar o Cliente (Frontend)](#como-rodar-o-cliente-frontend)
- [Principais Rotas da API](#principais-rotas-da-api)
- [Observações](#observações)

---

## Descrição

Este projeto é um sistema para gerenciar laboratórios acadêmicos, incluindo cadastro de campi, blocos, laboratórios, computadores, programas, agendamentos, solicitações de manutenção e mais.

---

## Estrutura do Projeto

```
UFCLabs/
├── client/         # Frontend React (Vite)
├── server/         # Backend Node.js (Express + Sequelize)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env
│   └── app.js
├── labs_system.sql # Script para criar o banco de dados MySQL
└── README.md
```

---

## Requisitos

- Node.js >= 18.x
- npm >= 9.x
- MySQL >= 8.x

---

## Configuração do Banco de Dados

1. Crie o banco de dados e as tabelas executando o script SQL:

   ```sh
   mysql -u root -p < labs_system.sql
   ```

2. Configure as variáveis de ambiente no arquivo `server/.env`:

   ```
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=LabsSystem
   PORT=3000
   ```

---

## Como Rodar o Servidor (Backend)

```sh
cd server
npm install
npm start
```

O backend estará disponível em `http://localhost:3000`.

---

## Como Rodar o Cliente (Frontend)

```sh
cd client
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (ou porta indicada pelo Vite).

---

## Principais Rotas da API

- **Campus:** `/api/campuses`
- **Block:** `/api/blocks`
- **Laboratory:** `/api/laboratories`
- **Computer:** `/api/computers`
- **ScheduleSlot:** `/api/scheduleslots`
- **LabSchedule:** `/api/labschedules`
- **Program:** `/api/programs`
- **LabProgramRequest:** `/api/labprogramrequests`
- **ComputerProgram:** `/api/computerprograms`
- **ComputerIssue:** `/api/computerissues`
- **MaintenanceRequest:** `/api/maintenancerequests`

Cada rota suporta operações CRUD (GET, POST, PUT, DELETE) conforme implementado nos controllers.

---

## Observações

- O sistema utiliza Sequelize para ORM e Express para API REST.
- O frontend utiliza React com Material UI.
- Certifique-se de que o banco de dados está rodando antes de iniciar o backend.
- Para dúvidas sobre os campos das tabelas, consulte o arquivo `labs_system.sql`.

---

Desenvolvido para UFC Engenharia de Software.
