import LabSchedule from '../models/LabSchedule.js';

/**
 * @swagger
 * /api/lab-schedules:
 *   get:
 *     summary: Listar todos os agendamentos de laboratório
 *     description: Retorna uma lista com todos os agendamentos de laboratórios
 *     tags: [Lab Schedules]
 *     responses:
 *       200:
 *         description: Lista de agendamentos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LabSchedule'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllLabSchedules = async (req, res) => {
  try {
    const schedules = await LabSchedule.findAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/lab-schedules:
 *   post:
 *     summary: Criar um novo agendamento de laboratório
 *     description: Cria um novo agendamento para um laboratório
 *     tags: [Lab Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lab_id, slot_id, day_of_week, discipline, teacher, status]
 *             properties:
 *               lab_id:
 *                 type: integer
 *                 description: ID do laboratório
 *                 example: 1
 *               slot_id:
 *                 type: integer
 *                 description: ID do slot de horário
 *                 example: 1
 *               day_of_week:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 7
 *                 description: Dia da semana (1=Segunda, 7=Domingo)
 *                 example: 2
 *               discipline:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome da disciplina
 *                 example: Algoritmos e Estruturas de Dados
 *               teacher:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do professor
 *                 example: Prof. Maria Santos
 *               status:
 *                 type: string
 *                 enum: [agendado, em andamento, concluido, cancelado]
 *                 description: Status do agendamento
 *                 example: agendado
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LabSchedule'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createLabSchedule = async (req, res) => {
  try {
    const { lab_id, time, day_of_week, discipline, teacher, status } = req.body;
    const newSchedule = await LabSchedule.create({ lab_id, time, day_of_week, discipline, teacher, status });
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLabScheduleById = async (req, res) => {
  try {
    const { lab_id, time, day_of_week } = req.params;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, time, day_of_week }
    });
    if (!schedule) {
      return res.status(404).json({ error: 'LabSchedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLabSchedule = async (req, res) => {
  try {
    const { lab_id, time, day_of_week } = req.params;
    const { discipline, teacher, status } = req.body;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, time, day_of_week }
    });
    if (!schedule) {
      return res.status(404).json({ error: 'LabSchedule not found' });
    }
    await schedule.update({ discipline, teacher, status });
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLabSchedule = async (req, res) => {
  try {
    const { lab_id, time, day_of_week } = req.params;
    const schedule = await LabSchedule.findOne({
      where: { lab_id, time, day_of_week }
    });
    if (!schedule) {
      return res.status(404).json({ error: 'LabSchedule not found' });
    }
    await schedule.destroy();
    res.json({ message: 'LabSchedule deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLabSchedulesByLabId = async (req, res) => {
  try {
    const { lab_id } = req.query;
    if (!lab_id) {
      return res.status(400).json({ error: 'lab_id is required' });
    }
    // Include ScheduleSlot to get start_time and end_time
    const schedules = await LabSchedule.findAll({
      where: { lab_id }
    });
    // Map to flatten the response for frontend
    const result = schedules.map(s => ({
      lab_id: s.lab_id,
      time: s.time,
      day_of_week: s.day_of_week,
      discipline: s.discipline,
      teacher: s.teacher,
      status: s.status,
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};