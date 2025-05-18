require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
// const apiRouter = require('./routes/api');
// app.use('/api', apiRouter);

const campusRoutes = require('./routes/campusRoutes');
app.use('/api/campuses', campusRoutes);

const blockRoutes = require('./routes/blockRoutes');
app.use('/api/blocks', blockRoutes);

const laboratoryRoutes = require('./routes/laboratoryRoutes');
app.use('/api/laboratories', laboratoryRoutes);

const computerRoutes = require('./routes/computerRoutes');
app.use('/api/computers', computerRoutes);

const scheduleSlotRoutes = require('./routes/scheduleSlotRoutes');
app.use('/api/scheduleslots', scheduleSlotRoutes);

const labScheduleRoutes = require('./routes/labScheduleRoutes');
app.use('/api/labschedules', labScheduleRoutes);

const programRoutes = require('./routes/programRoutes');
app.use('/api/programs', programRoutes);

const labProgramRequestRoutes = require('./routes/labProgramRequestRoutes');
app.use('/api/labprogramrequests', labProgramRequestRoutes);

const computerProgramRoutes = require('./routes/computerProgramRoutes');
app.use('/api/computerprograms', computerProgramRoutes);

const computerIssueRoutes = require('./routes/computerIssueRoutes');
app.use('/api/computerissues', computerIssueRoutes);

const maintenanceRequestRoutes = require('./routes/maintenanceRequestRoutes');
app.use('/api/maintenancerequests', maintenanceRequestRoutes);

// Test DB connection on startup
db.authenticate()
  .then(() => console.log('DB connection OK'))
  .catch(err => console.error('DB connection error:', err));
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});