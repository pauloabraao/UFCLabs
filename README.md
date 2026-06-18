# UFCLabs — Sistema de Gestão de Laboratórios

Sistema web para gestão de laboratórios acadêmicos da Universidade Federal do Ceará (UFC), desenvolvido para a disciplina de Engenharia de Software.

🔗 **Deploy:** [https://pauloabraao.github.io/UFCLabs](https://pauloabraao.github.io/UFCLabs)  
📁 **Repositório:** [https://github.com/pauloabraao/UFCLabs](https://github.com/pauloabraao/UFCLabs)

---

## Sumário

- [Descrição](#descrição)
- [Módulos do Sistema](#módulos-do-sistema)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [API de Relatórios (Python)](#api-de-relatórios-python)
- [Autenticação](#autenticação)
- [Rotas da API](#rotas-da-api)
- [Documentação Swagger](#documentação-swagger)

---

## Descrição

O UFCLabs é um sistema de gestão de laboratórios acadêmicos que permite o cadastro e administração de campi, blocos, laboratórios, computadores, programas instalados, agendamentos, chamados de suporte técnico e solicitações de manutenção. O público-alvo é a equipe técnica e administrativa responsável pelos laboratórios da UFC.

---

## Módulos do Sistema

| Módulo | Descrição |
|---|---|
| **Login / Cadastro** | Autenticação via JWT. O token é salvo em cookie e utilizado em todas as requisições à API. |
| **Laboratórios** | Navegação por campus e bloco para listar, criar, editar e excluir laboratórios. |
| **Computadores** | Gerenciamento de computadores de um laboratório, com visualização do horário de uso. |
| **Programas** | Visualização e gerenciamento dos programas instalados em cada computador. |
| **Chamados Técnicos** | Abertura, acompanhamento e gerenciamento de chamados de problemas em computadores, com filtros por status (Aberto, Em andamento, Resolvido). |
| **Relatórios** | Download de relatório PDF gerado pela API Python. |

---

## Estrutura do Projeto

```
UFCLabs/
├── client/               # Frontend React (Vite + MUI)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── utils/
├── server/               # Backend Node.js (Express + Sequelize)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── enums/
│   ├── config/
│   └── app.js
├── api/                  # API Python (Flask) para geração de relatórios PDF
│   ├── app.py
│   └── requirements.txt
├── labs_system.sql       # Script de criação do banco de dados
├── db_seeding.sql        # Script de população com dados iniciais
└── README.md
```

---

## Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x
- MySQL >= 8.x
- Python >= 3.8 *(apenas para a API de relatórios)*

---

## Configuração do Banco de Dados

Execute os scripts SQL na seguinte ordem:

```sh
# 1. Criar o schema e as tabelas
mysql -u root -p < labs_system.sql

# 2. Popular com dados iniciais
mysql -u root -p < db_seeding.sql
```

O seed insere dados em: Campus, Block, Laboratory, User, LabSchedule, Program e Computer.

---

## Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `server/` com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=LabsSystem
PORT=3000
NODE_ENV=development
DB_SYNC=false
JWT_SECRET=sua_chave_secreta
```

> ⚠️ O servidor **não inicia** se `JWT_SECRET` não estiver definido.

---

## Como Rodar o Projeto

### Backend

```sh
cd server
npm install
npm start
```

Disponível em: `http://localhost:3000`

### Frontend

```sh
cd client
npm install
npm run dev
```

Disponível em: `http://localhost:5173`

---

## API de Relatórios (Python)

A geração de relatórios PDF é feita por um serviço Flask separado.

```sh
cd api
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

> ⚠️ As credenciais do banco de dados estão configuradas diretamente em `api/app.py`. Atualize-as antes de rodar.

---

## Autenticação

O sistema utiliza **JWT (JSON Web Token)** com validade de **24 horas**.

**Fluxo:**
1. O usuário faz login via `POST /api/auth/login` com email e senha
2. O backend valida as credenciais (suporte a bcrypt e SHA-256 legado) e retorna o token JWT
3. O frontend salva o token em cookie
4. O interceptor do axios injeta o token como `Authorization: Bearer <token>` em todas as requisições
5. Rotas protegidas verificam o token via middleware `verifyToken` e, quando necessário, `requireRole`

---

## Rotas da API

### Autenticação
| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/auth/login` | Login e geração do token JWT |

### Campus
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/campuses` | Lista todos os campi |
| POST | `/api/campuses` | Cria um campus |
| GET | `/api/campuses/:id` | Busca campus por ID |
| PUT | `/api/campuses/:id` | Atualiza campus |
| DELETE | `/api/campuses/:id` | Exclui campus |

### Blocos
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/blocks` | Lista todos os blocos |
| POST | `/api/blocks` | Cria um bloco |
| GET | `/api/blocks/:id` | Busca bloco por ID |
| PUT | `/api/blocks/:id` | Atualiza bloco |
| DELETE | `/api/blocks/:id` | Exclui bloco |

### Laboratórios
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/laboratories` | Lista todos os laboratórios |
| POST | `/api/laboratories` | Cria um laboratório |
| GET | `/api/laboratories/:id` | Busca laboratório por ID |
| PUT | `/api/laboratories/:id` | Atualiza laboratório |
| DELETE | `/api/laboratories/:id` | Exclui laboratório |

### Computadores
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/computers` | Lista todos os computadores |
| POST | `/api/computers` | Cria um computador |
| GET | `/api/computers/:id` | Busca computador por ID |
| PUT | `/api/computers/:id` | Atualiza computador |
| DELETE | `/api/computers/:id` | Exclui computador |

### Horários de Grade
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/schedule-slots` | Lista horários de grade |
| POST | `/api/schedule-slots` | Cria um horário |
| GET | `/api/schedule-slots/:id` | Busca horário por ID |
| PUT | `/api/schedule-slots/:id` | Atualiza horário |
| DELETE | `/api/schedule-slots/:id` | Exclui horário |

### Agendamentos de Laboratório
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/lab-schedules` | Lista todos os agendamentos |
| POST | `/api/lab-schedules` | Cria um agendamento |
| GET | `/api/lab-schedules/by-lab?lab_id=` | Lista agendamentos de um laboratório |
| GET | `/api/lab-schedules/:lab_id/:time/:day_of_week` | Busca agendamento específico |
| PUT | `/api/lab-schedules/:lab_id/:time/:day_of_week` | Atualiza agendamento específico |
| DELETE | `/api/lab-schedules/:lab_id/:time/:day_of_week` | Exclui agendamento específico |

### Programas
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/programs` | Lista todos os programas |
| POST | `/api/programs` | Cria um programa |
| GET | `/api/programs/:id` | Busca programa por ID |
| PUT | `/api/programs/:id` | Atualiza programa |
| DELETE | `/api/programs/:id` | Exclui programa |

### Programas por Computador
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/computer-programs` | Lista vínculos computador-programa |
| POST | `/api/computer-programs` | Cria vínculo computador-programa |
| GET | `/api/computer-programs/computer/:computer_id` | Lista programas de um computador |
| GET | `/api/computer-programs/:computer_id/:program_id` | Busca vínculo específico |
| DELETE | `/api/computer-programs/:computer_id/:program_id` | Remove vínculo específico |

### Solicitações de Programa para Laboratório
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/lab-program-requests` | Lista solicitações |
| POST | `/api/lab-program-requests` | Cria solicitação |
| GET | `/api/lab-program-requests/:id` | Busca solicitação por ID |
| PUT | `/api/lab-program-requests/:id` | Atualiza solicitação |
| DELETE | `/api/lab-program-requests/:id` | Exclui solicitação |

### Chamados Técnicos
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/computer-issues` | Lista todos os chamados |
| POST | `/api/computer-issues` | Abre um chamado |
| GET | `/api/computer-issues/:id` | Busca chamado por ID |
| PUT | `/api/computer-issues/:id` | Atualiza chamado |
| DELETE | `/api/computer-issues/:id` | Exclui chamado |

### Solicitações de Manutenção
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/maintenance-requests` | Lista solicitações de manutenção |
| POST | `/api/maintenance-requests` | Cria solicitação |
| GET | `/api/maintenance-requests/:id` | Busca solicitação por ID |
| PUT | `/api/maintenance-requests/:id` | Atualiza solicitação |
| DELETE | `/api/maintenance-requests/:id` | Exclui solicitação |

### Usuários
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/users` | Lista todos os usuários |
| POST | `/api/users` | Cria um usuário |
| GET | `/api/users/:id` | Busca usuário por ID |
| PUT | `/api/users/:id` | Atualiza usuário |
| DELETE | `/api/users/:id` | Exclui usuário |

---

## Documentação Swagger

Com o backend rodando, acesse a documentação interativa da API em:

```
http://localhost:3000/api-docs
```

---

Desenvolvido pela equipe UFCLabs — UFC Engenharia de Computação, Sobral.
