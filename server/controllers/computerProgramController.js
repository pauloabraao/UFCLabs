import ComputerProgram from '../models/ComputerProgram.js';

/**
 * @swagger
 * /api/computer-programs:
 *   get:
 *     summary: Listar todos os programas dos computadores
 *     description: Retorna uma lista com todos os programas instalados nos computadores
 *     tags: [Computer Programs]
 *     responses:
 *       200:
 *         description: Lista de programas recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ComputerProgram'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllComputerPrograms = async (req, res) => {
  try {
    const cps = await ComputerProgram.findAll();
    res.json(cps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/computer-programs:
 *   post:
 *     summary: Associar programa a computador
 *     description: Cria uma nova associação entre computador e programa
 *     tags: [Computer Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [computer_id, program_id]
 *             properties:
 *               computer_id:
 *                 type: integer
 *                 description: ID do computador
 *                 example: 1
 *               program_id:
 *                 type: integer
 *                 description: ID do programa
 *                 example: 1
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComputerProgram'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createComputerProgram = async (req, res) => {
  try {
    const { computer_id, program_id } = req.body;
    const newCP = await ComputerProgram.create({ computer_id, program_id });
    res.status(201).json(newCP);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProgramsByProgramId = async (req, res) => {
  try {
    const { computer_id, program_id } = req.params;
    const programs = await ComputerProgram.findAll({
      where: { computer_id, program_id }
    });

    if (programs.length === 0) {
      return res.status(404).json({ error: 'No programs found for this program_id' });
    }

    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgramsByComputerId = async (req, res) => {
  try {
    const { computer_id } = req.params;
    const programs = await ComputerProgram.findAll({
      where: { computer_id }
    });

    if (programs.length === 0) {
      return res.status(404).json({ error: 'No programs found for this computer_id' });
    }

    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteComputerProgram = async (req, res) => {
  try {
    const { computer_id, program_id } = req.params;
    const cp = await ComputerProgram.findOne({
      where: { computer_id, program_id }
    });
    if (!cp) {
      return res.status(404).json({ error: 'ComputerProgram not found' });
    }
    await cp.destroy();
    res.json({ message: 'ComputerProgram deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
