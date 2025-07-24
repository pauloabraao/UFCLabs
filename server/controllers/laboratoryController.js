import Laboratory from '../models/Laboratory.js';

/**
 * @swagger
 * /api/laboratories:
 *   get:
 *     summary: Listar todos os laboratórios
 *     description: Retorna uma lista com todos os laboratórios. Pode filtrar por block_id através de query parameter.
 *     tags: [Laboratories]
 *     parameters:
 *       - in: query
 *         name: block_id
 *         schema:
 *           type: integer
 *         description: ID do bloco para filtrar os laboratórios
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de laboratórios recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laboratory'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllLaboratories = async (req, res) => {
  try {
    const where = {};
    if (req.query.block_id) {
      where.block_id = req.query.block_id;
    }
    const labs = await Laboratory.findAll({ where });
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/laboratories:
 *   post:
 *     summary: Criar um novo laboratório
 *     description: Cria um novo laboratório no sistema
 *     tags: [Laboratories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [block_id, name, capacity, num_computers]
 *             properties:
 *               block_id:
 *                 type: integer
 *                 description: ID do bloco
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do laboratório
 *                 example: LEC - Laboratório de Ensino de Computação
 *               capacity:
 *                 type: integer
 *                 description: Capacidade de pessoas
 *                 example: 40
 *               num_computers:
 *                 type: integer
 *                 description: Número de computadores
 *                 example: 20
 *     responses:
 *       201:
 *         description: Laboratório criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laboratory'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createLaboratory = async (req, res) => {
  try {
    const { block_id, name, capacity, num_computers } = req.body;
    const newLab = await Laboratory.create({ block_id, name, capacity, num_computers });
    res.status(201).json(newLab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/laboratories/{id}:
 *   get:
 *     summary: Buscar laboratório por ID
 *     description: Retorna um laboratório específico pelo seu ID
 *     tags: [Laboratories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do laboratório
 *         example: 1
 *     responses:
 *       200:
 *         description: Laboratório encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laboratory'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getLaboratoryById = async (req, res) => {
  try {
    const lab = await Laboratory.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Laboratory not found' });
    }
    res.json(lab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/laboratories/{id}:
 *   put:
 *     summary: Atualizar um laboratório
 *     description: Atualiza as informações de um laboratório existente
 *     tags: [Laboratories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do laboratório
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               block_id:
 *                 type: integer
 *                 description: ID do bloco
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do laboratório
 *                 example: LEC - Laboratório de Ensino de Computação
 *               capacity:
 *                 type: integer
 *                 description: Capacidade de pessoas
 *                 example: 40
 *               num_computers:
 *                 type: integer
 *                 description: Número de computadores
 *                 example: 20
 *     responses:
 *       200:
 *         description: Laboratório atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laboratory'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateLaboratory = async (req, res) => {
  try {
    const { block_id, name, capacity, num_computers } = req.body;
    const lab = await Laboratory.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Laboratory not found' });
    }
    await lab.update({ block_id, name, capacity, num_computers });
    res.json(lab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/laboratories/{id}:
 *   delete:
 *     summary: Excluir um laboratório
 *     description: Remove um laboratório do sistema
 *     tags: [Laboratories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do laboratório
 *         example: 1
 *     responses:
 *       200:
 *         description: Laboratório excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Laboratory deleted
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteLaboratory = async (req, res) => {
  try {
    const lab = await Laboratory.findByPk(req.params.id);
    if (!lab) {
      return res.status(404).json({ error: 'Laboratory not found' });
    }
    await lab.destroy();
    res.json({ message: 'Laboratory deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
