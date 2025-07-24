import Computer from '../models/Computer.js';

/**
 * @swagger
 * /api/computers:
 *   get:
 *     summary: Listar todos os computadores
 *     description: Retorna uma lista com todos os computadores. Pode filtrar por lab_id através de query parameter.
 *     tags: [Computers]
 *     parameters:
 *       - in: query
 *         name: lab_id
 *         schema:
 *           type: integer
 *         description: ID do laboratório para filtrar os computadores
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de computadores recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Computer'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllComputers = async (req, res) => {
  try {
    const where = {};
    if (req.query.lab_id) {
      where.lab_id = req.query.lab_id;
    }
    const computers = await Computer.findAll({ where });
    res.json(computers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/computers:
 *   post:
 *     summary: Criar um novo computador
 *     description: Adiciona um novo computador ao sistema
 *     tags: [Computers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lab_id, status]
 *             properties:
 *               lab_id:
 *                 type: integer
 *                 description: ID do laboratório
 *                 example: 1
 *               os:
 *                 type: string
 *                 maxLength: 100
 *                 description: Sistema operacional
 *                 example: Ubuntu 22.04 LTS
 *               cpu:
 *                 type: string
 *                 maxLength: 100
 *                 description: Processador
 *                 example: Intel Core i5-10400
 *               ram:
 *                 type: string
 *                 maxLength: 50
 *                 description: Memória RAM
 *                 example: 8GB DDR4
 *               storage:
 *                 type: string
 *                 maxLength: 50
 *                 description: Armazenamento
 *                 example: 256GB SSD
 *               status:
 *                 type: string
 *                 enum: [disponivel, fora de servico, em reparo]
 *                 description: Status do computador
 *                 example: disponivel
 *     responses:
 *       201:
 *         description: Computador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Computer'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createComputer = async (req, res) => {
  try {
    const { lab_id, os, cpu, ram, storage, status } = req.body;
    const newComputer = await Computer.create({ lab_id, os, cpu, ram, storage, status });
    res.status(201).json(newComputer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/computers/{id}:
 *   get:
 *     summary: Buscar computador por ID
 *     description: Retorna um computador específico pelo seu ID
 *     tags: [Computers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do computador
 *         example: 1
 *     responses:
 *       200:
 *         description: Computador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Computer'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getComputerById = async (req, res) => {
  try {
    const computer = await Computer.findByPk(req.params.id);
    if (!computer) {
      return res.status(404).json({ error: 'Computer not found' });
    }
    res.json(computer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/computers/{id}:
 *   put:
 *     summary: Atualizar um computador
 *     description: Atualiza as informações de um computador existente
 *     tags: [Computers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do computador
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lab_id:
 *                 type: integer
 *                 description: ID do laboratório
 *                 example: 1
 *               os:
 *                 type: string
 *                 maxLength: 100
 *                 description: Sistema operacional
 *                 example: Ubuntu 22.04 LTS
 *               cpu:
 *                 type: string
 *                 maxLength: 100
 *                 description: Processador
 *                 example: Intel Core i5-10400
 *               ram:
 *                 type: string
 *                 maxLength: 50
 *                 description: Memória RAM
 *                 example: 8GB DDR4
 *               storage:
 *                 type: string
 *                 maxLength: 50
 *                 description: Armazenamento
 *                 example: 256GB SSD
 *               status:
 *                 type: string
 *                 enum: [disponivel, fora de servico, em reparo]
 *                 description: Status do computador
 *                 example: disponivel
 *     responses:
 *       200:
 *         description: Computador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Computer'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateComputer = async (req, res) => {
  try {
    const { lab_id, os, cpu, ram, storage, status } = req.body;
    const computer = await Computer.findByPk(req.params.id);
    if (!computer) {
      return res.status(404).json({ error: 'Computer not found' });
    }
    await computer.update({ lab_id, os, cpu, ram, storage, status });
    res.json(computer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/computers/{id}:
 *   delete:
 *     summary: Excluir um computador
 *     description: Remove um computador do sistema
 *     tags: [Computers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do computador
 *         example: 1
 *     responses:
 *       200:
 *         description: Computador excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Computer deleted
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteComputer = async (req, res) => {
  try {
    const computer = await Computer.findByPk(req.params.id);
    if (!computer) {
      return res.status(404).json({ error: 'Computer not found' });
    }
    await computer.destroy();
    res.json({ message: 'Computer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
