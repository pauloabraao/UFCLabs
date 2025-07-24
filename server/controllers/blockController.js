import Block from '../models/Block.js';

/**
 * @swagger
 * /api/blocks:
 *   get:
 *     summary: Listar todos os blocos
 *     description: Retorna uma lista com todos os blocos. Pode filtrar por campus_id através de query parameter.
 *     tags: [Blocks]
 *     parameters:
 *       - in: query
 *         name: campus_id
 *         schema:
 *           type: integer
 *         description: ID do campus para filtrar os blocos
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de blocos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Block'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllBlocks = async (req, res) => {
  try {
    const where = {};
    if (req.query.campus_id) {
      where.campus_id = req.query.campus_id;
    }
    const blocks = await Block.findAll({ where });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/blocks:
 *   post:
 *     summary: Criar um novo bloco
 *     description: Cria um novo bloco no sistema
 *     tags: [Blocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [campus_id, name]
 *             properties:
 *               campus_id:
 *                 type: integer
 *                 description: ID do campus
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do bloco
 *                 example: Bloco 952
 *     responses:
 *       201:
 *         description: Bloco criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Block'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createBlock = async (req, res) => {
  try {
    const { campus_id, name } = req.body;
    const newBlock = await Block.create({ campus_id, name });
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/blocks/{id}:
 *   get:
 *     summary: Buscar bloco por ID
 *     description: Retorna um bloco específico pelo seu ID
 *     tags: [Blocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do bloco
 *         example: 1
 *     responses:
 *       200:
 *         description: Bloco encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Block'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getBlockById = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/blocks/{id}:
 *   put:
 *     summary: Atualizar um bloco
 *     description: Atualiza as informações de um bloco existente
 *     tags: [Blocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do bloco
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               campus_id:
 *                 type: integer
 *                 description: ID do campus
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do bloco
 *                 example: Bloco 952
 *     responses:
 *       200:
 *         description: Bloco atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Block'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateBlock = async (req, res) => {
  try {
    const { campus_id, name } = req.body;
    const block = await Block.findByPk(req.params.id);
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    await block.update({ campus_id, name });
    res.json(block);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/blocks/{id}:
 *   delete:
 *     summary: Excluir um bloco
 *     description: Remove um bloco do sistema
 *     tags: [Blocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do bloco
 *         example: 1
 *     responses:
 *       200:
 *         description: Bloco excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Block deleted
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteBlock = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    await block.destroy();
    res.json({ message: 'Block deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
