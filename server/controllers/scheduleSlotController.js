import ScheduleSlot from '../models/ScheduleSlot.js';

/**
 * @swagger
 * /api/schedule-slots:
 *   get:
 *     summary: Listar todos os slots de horário
 *     description: Retorna uma lista com todos os slots de horário cadastrados
 *     tags: [Schedule Slots]
 *     responses:
 *       200:
 *         description: Lista de slots de horário recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScheduleSlot'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllScheduleSlots = async (req, res) => {
  try {
    const slots = await ScheduleSlot.findAll();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule-slots:
 *   post:
 *     summary: Criar um novo slot de horário
 *     description: Cria um novo slot de horário no sistema
 *     tags: [Schedule Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [start_time, end_time]
 *             properties:
 *               start_time:
 *                 type: string
 *                 format: time
 *                 description: Horário de início
 *                 example: "08:00:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 description: Horário de fim
 *                 example: "10:00:00"
 *     responses:
 *       201:
 *         description: Slot de horário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleSlot'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createScheduleSlot = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const newSlot = await ScheduleSlot.create({ start_time, end_time });
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule-slots/{id}:
 *   get:
 *     summary: Buscar slot de horário por ID
 *     description: Retorna um slot de horário específico pelo seu ID
 *     tags: [Schedule Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do slot de horário
 *         example: 1
 *     responses:
 *       200:
 *         description: Slot de horário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleSlot'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getScheduleSlotById = async (req, res) => {
  try {
    const slot = await ScheduleSlot.findByPk(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: 'ScheduleSlot not found' });
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule-slots/{id}:
 *   put:
 *     summary: Atualizar um slot de horário
 *     description: Atualiza as informações de um slot de horário existente
 *     tags: [Schedule Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do slot de horário
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_time:
 *                 type: string
 *                 format: time
 *                 description: Horário de início
 *                 example: "08:00:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 description: Horário de fim
 *                 example: "10:00:00"
 *     responses:
 *       200:
 *         description: Slot de horário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleSlot'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateScheduleSlot = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const slot = await ScheduleSlot.findByPk(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: 'ScheduleSlot not found' });
    }
    await slot.update({ start_time, end_time });
    res.json(slot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/schedule-slots/{id}:
 *   delete:
 *     summary: Excluir um slot de horário
 *     description: Remove um slot de horário do sistema
 *     tags: [Schedule Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do slot de horário
 *         example: 1
 *     responses:
 *       200:
 *         description: Slot de horário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ScheduleSlot deleted
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteScheduleSlot = async (req, res) => {
  try {
    const slot = await ScheduleSlot.findByPk(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: 'ScheduleSlot not found' });
    }
    await slot.destroy();
    res.json({ message: 'ScheduleSlot deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
