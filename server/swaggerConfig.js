import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UFCLabs API',
      version: '1.0.0',
      description: 'Sistema de gerenciamento de laboratórios de informática da UFC - API RESTful para gerenciar campus, blocos, laboratórios, computadores, agendamentos e manutenções.',
      contact: {
        name: 'UFCLabs Team',
        email: 'contact@ufclabs.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://api.ufclabs.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer {token}'
        }
      },
      schemas: {
        Campus: {
          type: 'object',
          required: ['name', 'location'],
          properties: {
            campus_id: {
              type: 'integer',
              description: 'ID único do campus',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'Nome do campus',
              example: 'Campus do Pici'
            },
            location: {
              type: 'string',
              maxLength: 255,
              description: 'Localização do campus',
              example: 'Fortaleza, CE'
            }
          }
        },
        Block: {
          type: 'object',
          required: ['campus_id', 'name'],
          properties: {
            block_id: {
              type: 'integer',
              description: 'ID único do bloco',
              example: 1
            },
            campus_id: {
              type: 'integer',
              description: 'ID do campus ao qual o bloco pertence',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'Nome do bloco',
              example: 'Bloco 952'
            }
          }
        },
        Laboratory: {
          type: 'object',
          required: ['block_id', 'name', 'capacity', 'num_computers'],
          properties: {
            lab_id: {
              type: 'integer',
              description: 'ID único do laboratório',
              example: 1
            },
            block_id: {
              type: 'integer',
              description: 'ID do bloco ao qual o laboratório pertence',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'Nome do laboratório',
              example: 'LEC - Laboratório de Ensino de Computação'
            },
            capacity: {
              type: 'integer',
              description: 'Capacidade de pessoas no laboratório',
              example: 40
            },
            num_computers: {
              type: 'integer',
              description: 'Número de computadores no laboratório',
              example: 20
            }
          }
        },
        Computer: {
          type: 'object',
          required: ['lab_id', 'status'],
          properties: {
            computer_id: {
              type: 'integer',
              description: 'ID único do computador',
              example: 1
            },
            lab_id: {
              type: 'integer',
              description: 'ID do laboratório ao qual o computador pertence',
              example: 1
            },
            os: {
              type: 'string',
              maxLength: 100,
              description: 'Sistema operacional',
              example: 'Ubuntu 22.04 LTS'
            },
            cpu: {
              type: 'string',
              maxLength: 100,
              description: 'Processador',
              example: 'Intel Core i5-10400'
            },
            ram: {
              type: 'string',
              maxLength: 50,
              description: 'Memória RAM',
              example: '8GB DDR4'
            },
            storage: {
              type: 'string',
              maxLength: 50,
              description: 'Armazenamento',
              example: '256GB SSD'
            },
            status: {
              type: 'string',
              enum: ['disponivel', 'fora de servico', 'em reparo'],
              description: 'Status do computador',
              example: 'disponivel'
            }
          }
        },
        User: {
          type: 'object',
          required: ['campus_id', 'name', 'email', 'password', 'role'],
          properties: {
            user_id: {
              type: 'integer',
              description: 'ID único do usuário',
              example: 1
            },
            campus_id: {
              type: 'integer',
              description: 'ID do campus do usuário',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'Nome do usuário',
              example: 'João Silva'
            },
            email: {
              type: 'string',
              maxLength: 100,
              format: 'email',
              description: 'Email do usuário',
              example: 'joao.silva@ufc.br'
            },
            password: {
              type: 'string',
              maxLength: 255,
              format: 'password',
              description: 'Senha do usuário (hash)',
              example: '$2b$10$...'
            },
            role: {
              type: 'string',
              enum: ['administrador', 'professor', 'estudante', 'tecnico'],
              description: 'Função do usuário no sistema',
              example: 'professor'
            }
          }
        },
        ScheduleSlot: {
          type: 'object',
          required: ['start_time', 'end_time'],
          properties: {
            slot_id: {
              type: 'integer',
              description: 'ID único do slot de horário',
              example: 1
            },
            start_time: {
              type: 'string',
              format: 'time',
              description: 'Horário de início',
              example: '08:00:00'
            },
            end_time: {
              type: 'string',
              format: 'time',
              description: 'Horário de fim',
              example: '10:00:00'
            }
          }
        },
        LabSchedule: {
          type: 'object',
          required: ['lab_id', 'slot_id', 'day_of_week', 'discipline', 'teacher', 'status'],
          properties: {
            lab_id: {
              type: 'integer',
              description: 'ID do laboratório',
              example: 1
            },
            slot_id: {
              type: 'integer',
              description: 'ID do slot de horário',
              example: 1
            },
            day_of_week: {
              type: 'integer',
              minimum: 1,
              maximum: 7,
              description: 'Dia da semana (1=Segunda, 7=Domingo)',
              example: 2
            },
            discipline: {
              type: 'string',
              maxLength: 100,
              description: 'Nome da disciplina',
              example: 'Algoritmos e Estruturas de Dados'
            },
            teacher: {
              type: 'string',
              maxLength: 100,
              description: 'Nome do professor',
              example: 'Prof. Maria Santos'
            },
            status: {
              type: 'string',
              enum: ['agendado', 'em andamento', 'concluido', 'cancelado'],
              description: 'Status do agendamento',
              example: 'agendado'
            }
          }
        },
        Program: {
          type: 'object',
          required: ['name', 'version'],
          properties: {
            program_id: {
              type: 'integer',
              description: 'ID único do programa',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'Nome do programa',
              example: 'Visual Studio Code'
            },
            version: {
              type: 'string',
              maxLength: 50,
              description: 'Versão do programa',
              example: '1.85.0'
            }
          }
        },
        ComputerProgram: {
          type: 'object',
          required: ['computer_id', 'program_id'],
          properties: {
            computer_id: {
              type: 'integer',
              description: 'ID do computador',
              example: 1
            },
            program_id: {
              type: 'integer',
              description: 'ID do programa',
              example: 1
            }
          }
        },
        LabProgramRequest: {
          type: 'object',
          required: ['lab_id', 'requested_by', 'program_name', 'version', 'status', 'request_date'],
          properties: {
            request_id: {
              type: 'integer',
              description: 'ID único da solicitação',
              example: 1
            },
            lab_id: {
              type: 'integer',
              description: 'ID do laboratório',
              example: 1
            },
            requested_by: {
              type: 'integer',
              description: 'ID do usuário solicitante',
              example: 1
            },
            program_name: {
              type: 'string',
              maxLength: 100,
              description: 'Nome do programa solicitado',
              example: 'PyCharm Professional'
            },
            version: {
              type: 'string',
              maxLength: 50,
              description: 'Versão do programa solicitado',
              example: '2023.3'
            },
            status: {
              type: 'string',
              enum: ['pendente', 'aprovado', 'rejeitado', 'instalado'],
              description: 'Status da solicitação',
              example: 'pendente'
            },
            request_date: {
              type: 'string',
              format: 'date',
              description: 'Data da solicitação',
              example: '2025-01-20'
            }
          }
        },
        ComputerIssue: {
          type: 'object',
          required: ['computer_id', 'reported_by', 'description', 'date_reported', 'status', 'component'],
          properties: {
            issue_id: {
              type: 'integer',
              description: 'ID único do problema',
              example: 1
            },
            computer_id: {
              type: 'integer',
              description: 'ID do computador com problema',
              example: 1
            },
            reported_by: {
              type: 'integer',
              description: 'ID do usuário que reportou',
              example: 1
            },
            description: {
              type: 'string',
              description: 'Descrição do problema',
              example: 'Computador não liga'
            },
            date_reported: {
              type: 'string',
              format: 'date',
              description: 'Data que o problema foi reportado',
              example: '2025-01-20'
            },
            status: {
              type: 'string',
              enum: ['reportado', 'em analise', 'resolvido', 'fechado'],
              description: 'Status do problema',
              example: 'reportado'
            },
            component: {
              type: 'string',
              enum: ['hardware', 'software', 'rede'],
              description: 'Componente com problema',
              example: 'hardware'
            }
          }
        },
        MaintenanceRequest: {
          type: 'object',
          required: ['computer_id', 'description', 'requested_by', 'status', 'created_at'],
          properties: {
            request_id: {
              type: 'integer',
              description: 'ID único da solicitação de manutenção',
              example: 1
            },
            computer_id: {
              type: 'integer',
              description: 'ID do computador',
              example: 1
            },
            description: {
              type: 'string',
              description: 'Descrição da manutenção necessária',
              example: 'Limpeza preventiva e atualização de drivers'
            },
            requested_by: {
              type: 'integer',
              description: 'ID do usuário solicitante',
              example: 1
            },
            status: {
              type: 'string',
              enum: ['pendente', 'em andamento', 'concluida', 'cancelada'],
              description: 'Status da manutenção',
              example: 'pendente'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora da criação da solicitação',
              example: '2025-01-20T10:30:00Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Descrição do erro',
              example: 'Resource not found'
            },
            message: {
              type: 'string',
              description: 'Mensagem detalhada do erro',
              example: 'The requested resource was not found'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        BadRequest: {
          description: 'Requisição inválida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        Unauthorized: {
          description: 'Não autorizado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Campus',
        description: 'Operações relacionadas aos campus da UFC'
      },
      {
        name: 'Blocks',
        description: 'Operações relacionadas aos blocos dos campus'
      },
      {
        name: 'Laboratories',
        description: 'Operações relacionadas aos laboratórios'
      },
      {
        name: 'Computers',
        description: 'Operações relacionadas aos computadores'
      },
      {
        name: 'Users',
        description: 'Operações relacionadas aos usuários do sistema'
      },
      {
        name: 'Authentication',
        description: 'Operações de autenticação e autorização'
      },
      {
        name: 'Schedule Slots',
        description: 'Operações relacionadas aos slots de horário'
      },
      {
        name: 'Lab Schedules',
        description: 'Operações relacionadas aos agendamentos de laboratórios'
      },
      {
        name: 'Programs',
        description: 'Operações relacionadas aos programas de software'
      },
      {
        name: 'Computer Programs',
        description: 'Operações relacionadas aos programas instalados nos computadores'
      },
      {
        name: 'Lab Program Requests',
        description: 'Operações relacionadas às solicitações de instalação de programas'
      },
      {
        name: 'Computer Issues',
        description: 'Operações relacionadas aos problemas reportados nos computadores'
      },
      {
        name: 'Maintenance Requests',
        description: 'Operações relacionadas às solicitações de manutenção'
      },
      {
        name: 'Health',
        description: 'Verificação de saúde da API'
      }
    ]
  },
  apis: [
    './controllers/*.js',
    './routes/*.js'
  ]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
