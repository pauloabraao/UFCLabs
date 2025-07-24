import ComputerIssue from '../models/ComputerIssue.js';

/**
 * @swagger
 * /api/computer-issues:
 *   get:
 *     summary: Listar todos os problemas de computadores
 *     description: Retorna uma lista com todos os problemas reportados nos computadores
 *     tags: [Computer Issues]
 *     responses:
 *       200:
 *         description: Lista de problemas recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ComputerIssue'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllComputerIssues = async (req, res) => {
  try {
    const issues = await ComputerIssue.findAll();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/computer-issues:
 *   post:
 *     summary: Reportar um novo problema
 *     description: Cria um novo reporte de problema em um computador
 *     tags: [Computer Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [computer_id, reported_by, description, date_reported, status, component]
 *             properties:
 *               computer_id:
 *                 type: integer
 *                 description: ID do computador com problema
 *                 example: 1
 *               reported_by:
 *                 type: integer
 *                 description: ID do usuário que reportou
 *                 example: 1
 *               description:
 *                 type: string
 *                 description: Descrição do problema
 *                 example: Computador não liga
 *               date_reported:
 *                 type: string
 *                 format: date
 *                 description: Data que o problema foi reportado
 *                 example: "2025-01-20"
 *               status:
 *                 type: string
 *                 enum: [reportado, em analise, resolvido, fechado]
 *                 description: Status do problema
 *                 example: reportado
 *               component:
 *                 type: string
 *                 enum: [hardware, software, rede]
 *                 description: Componente com problema
 *                 example: hardware
 *     responses:
 *       201:
 *         description: Problema reportado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComputerIssue'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createComputerIssue = async (req, res) => {
  try {
    const { computer_id, reported_by, description, date_reported, status, component } = req.body;
    const newIssue = await ComputerIssue.create({
      computer_id, reported_by, description, date_reported, status, component
    });
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/computer-issues/{id}:
 *   get:
 *     summary: Buscar problema por ID
 *     description: Retorna um problema específico pelo seu ID
 *     tags: [Computer Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do problema
 *         example: 1
 *     responses:
 *       200:
 *         description: Problema encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComputerIssue'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getComputerIssueById = async (req, res) => {
  try {
    const issue = await ComputerIssue.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'ComputerIssue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComputerIssue = async (req, res) => {
  try {
    const { computer_id, reported_by, description, date_reported, status, component } = req.body;
    const issue = await ComputerIssue.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'ComputerIssue not found' });
    }
    await issue.update({ computer_id, reported_by, description, date_reported, status, component });
    res.json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteComputerIssue = async (req, res) => {
  try {
    const issue = await ComputerIssue.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'ComputerIssue not found' });
    }
    await issue.destroy();
    res.json({ message: 'ComputerIssue deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
