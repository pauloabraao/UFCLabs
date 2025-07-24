import 'dotenv/config'
import express  from 'express';
import cors  from 'cors';
import swaggerUi from 'swagger-ui-express';
import db from './config/db.js';
import apiRouter from './routes/index.js';
import swaggerSpec from './swaggerConfig.js';

const app = express();

// Check for essential environment variables
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in the .env file.');
  process.exit(1);
}

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de log (opcional)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customSiteTitle: 'UFCLabs API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    tryItOutEnabled: true
  }
}));

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'UFCLabs API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      campuses: '/api/campuses',
      blocks: '/api/blocks',
      laboratories: '/api/laboratories',
      computers: '/api/computers',
      scheduleSlots: '/api/schedule-slots',
      labSchedules: '/api/lab-schedules',
      programs: '/api/programs',
      labProgramRequests: '/api/lab-program-requests',
      computerPrograms: '/api/computer-programs',
      computerIssues: '/api/computer-issues',
      maintenanceRequests: '/api/maintenance-requests',
      users: '/api/users'
    }
  });
});

// API Routes - Must come BEFORE the 404 middleware
app.use('/api', apiRouter);

// Middleware para rotas não encontradas
app.use('/', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: '/health, /, /api/*'
  });
});

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Inicializar servidor
async function startServer() {
  try {
    // Testa conexão com banco
    console.log('🔌 Testing database connection...');
    await db.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sincroniza modelos em desenvolvimento (opcional)
    if (process.env.NODE_ENV === 'development' && process.env.DB_SYNC === 'true') {
      await db.sync({ alter: true });
      console.log('📊 Database models synchronized');
    }

    // Inicia servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Access: http://localhost:${PORT}`);
      console.log(`💚 Health check: http://localhost:${PORT}/health`);
      console.log(`📖 API docs: http://localhost:${PORT}/`);
      console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Tratamento de encerramento gracioso
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  await db.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  await db.close();
  process.exit(0);
});

startServer();