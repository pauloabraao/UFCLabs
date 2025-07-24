import LabProgramRequest from '../models/LabProgramRequest.js';

/**
 * @swagger
 * /api/lab-program-requests:
 *   get:
 *     summary: Listar todas as solicitações de programas
 *     description: Retorna uma lista com todas as solicitações de instalação de programas
 *     tags: [Lab Program Requests]
 *     responses:
 *       200:
 *         description: Lista de solicitações recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LabProgramRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllLabProgramRequests = async (req, res) => {
  try {
    const requests = await LabProgramRequest.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/lab-program-requests:
 *   post:
 *     summary: Criar uma nova solicitação de programa
 *     description: Cria uma nova solicitação de instalação de programa para laboratório
 *     tags: [Lab Program Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lab_id, requested_by, program_name, version, status, request_date]
 *             properties:
 *               lab_id:
 *                 type: integer
 *                 description: ID do laboratório
 *                 example: 1
 *               requested_by:
 *                 type: integer
 *                 description: ID do usuário solicitante
 *                 example: 1
 *               program_name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do programa solicitado
 *                 example: PyCharm Professional
 *               version:
 *                 type: string
 *                 maxLength: 50
 *                 description: Versão do programa solicitado
 *                 example: "2023.3"
 *               status:
 *                 type: string
 *                 enum: [pendente, aprovado, rejeitado, instalado]
 *                 description: Status da solicitação
 *                 example: pendente
 *               request_date:
 *                 type: string
 *                 format: date
 *                 description: Data da solicitação
 *                 example: "2025-01-20"
 *     responses:
 *       201:
 *         description: Solicitação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LabProgramRequest'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createLabProgramRequest = async (req, res) => {
  try {
    const { lab_id, requested_by, program_name, version, status, request_date } = req.body;
    const newRequest = await LabProgramRequest.create({
      lab_id, requested_by, program_name, version, status, request_date
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLabProgramRequestById = async (req, res) => {
  try {
    const request = await LabProgramRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'LabProgramRequest not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLabProgramRequest = async (req, res) => {
  try {
    const { lab_id, requested_by, program_name, version, status, request_date } = req.body;
    const request = await LabProgramRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'LabProgramRequest not found' });
    }
    await request.update({ lab_id, requested_by, program_name, version, status, request_date });
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLabProgramRequest = async (req, res) => {
  try {
    const request = await LabProgramRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'LabProgramRequest not found' });
    }
    await request.destroy();
    res.json({ message: 'LabProgramRequest deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
