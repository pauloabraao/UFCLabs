import MaintenanceRequest from '../models/MaintenanceRequest.js';

/**
 * @swagger
 * /api/maintenance-requests:
 *   get:
 *     summary: Listar todas as solicitações de manutenção
 *     description: Retorna uma lista com todas as solicitações de manutenção
 *     tags: [Maintenance Requests]
 *     responses:
 *       200:
 *         description: Lista de solicitações recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllMaintenanceRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/maintenance-requests:
 *   post:
 *     summary: Criar uma nova solicitação de manutenção
 *     description: Cria uma nova solicitação de manutenção no sistema
 *     tags: [Maintenance Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [computer_id, description, requested_by, status, created_at]
 *             properties:
 *               computer_id:
 *                 type: integer
 *                 description: ID do computador
 *                 example: 1
 *               description:
 *                 type: string
 *                 description: Descrição da manutenção necessária
 *                 example: Limpeza preventiva e atualização de drivers
 *               requested_by:
 *                 type: integer
 *                 description: ID do usuário solicitante
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [pendente, em andamento, concluida, cancelada]
 *                 description: Status da manutenção
 *                 example: pendente
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora da criação da solicitação
 *                 example: "2025-01-20T10:30:00Z"
 *     responses:
 *       201:
 *         description: Solicitação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequest'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createMaintenanceRequest = async (req, res) => {
  try {
    const { computer_id, description, requested_by, status, created_at } = req.body;
    const newRequest = await MaintenanceRequest.create({
      computer_id, description, requested_by, status, created_at
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/maintenance-requests/{id}:
 *   get:
 *     summary: Buscar solicitação por ID
 *     description: Retorna uma solicitação específica pelo seu ID
 *     tags: [Maintenance Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único da solicitação
 *         example: 1
 *     responses:
 *       200:
 *         description: Solicitação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getMaintenanceRequestById = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'MaintenanceRequest not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMaintenanceRequest = async (req, res) => {
  try {
    const { computer_id, description, requested_by, status, created_at } = req.body;
    const request = await MaintenanceRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'MaintenanceRequest not found' });
    }
    await request.update({ computer_id, description, requested_by, status, created_at });
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMaintenanceRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'MaintenanceRequest not found' });
    }
    await request.destroy();
    res.json({ message: 'MaintenanceRequest deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
