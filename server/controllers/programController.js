import Program from '../models/Program.js';

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Listar todos os programas
 *     description: Retorna uma lista com todos os programas de software cadastrados
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: Lista de programas recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/programs:
 *   post:
 *     summary: Criar um novo programa
 *     description: Adiciona um novo programa de software ao sistema
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, version]
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do programa
 *                 example: Visual Studio Code
 *               version:
 *                 type: string
 *                 maxLength: 50
 *                 description: Versão do programa
 *                 example: 1.85.0
 *     responses:
 *       201:
 *         description: Programa criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createProgram = async (req, res) => {
  try {
    const { name, version } = req.body;
    const newProgram = await Program.create({ name, version });
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     summary: Buscar programa por ID
 *     description: Retorna um programa específico pelo seu ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do programa
 *         example: 1
 *     responses:
 *       200:
 *         description: Programa encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/programs/{id}:
 *   put:
 *     summary: Atualizar um programa
 *     description: Atualiza as informações de um programa existente
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do programa
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do programa
 *                 example: Visual Studio Code
 *               version:
 *                 type: string
 *                 maxLength: 50
 *                 description: Versão do programa
 *                 example: 1.85.0
 *     responses:
 *       200:
 *         description: Programa atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateProgram = async (req, res) => {
  try {
    const { name, version } = req.body;
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    await program.update({ name, version });
    res.json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/programs/{id}:
 *   delete:
 *     summary: Excluir um programa
 *     description: Remove um programa do sistema
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do programa
 *         example: 1
 *     responses:
 *       200:
 *         description: Programa excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Program deleted
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    await program.destroy();
    res.json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
