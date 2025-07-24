import Campus from '../models/Campus.js';

/**
 * @swagger
 * /api/campuses:
 *   get:
 *     summary: Listar todos os campus
 *     description: Retorna uma lista com todos os campus cadastrados no sistema
 *     tags: [Campus]
 *     responses:
 *       200:
 *         description: Lista de campus recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campus'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllCampuses = async (req, res) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/campuses:
 *   post:
 *     summary: Criar um novo campus
 *     description: Cria um novo campus no sistema
 *     tags: [Campus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, location]
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do campus
 *                 example: Campus do Pici
 *               location:
 *                 type: string
 *                 maxLength: 255
 *                 description: Localização do campus
 *                 example: Fortaleza, CE
 *     responses:
 *       201:
 *         description: Campus criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campus'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createCampus = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newCampus = await Campus.create({ name, location });
    res.status(201).json(newCampus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/campuses/{id}:
 *   get:
 *     summary: Buscar campus por ID
 *     description: Retorna um campus específico pelo seu ID
 *     tags: [Campus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do campus
 *         example: 1
 *     responses:
 *       200:
 *         description: Campus encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campus'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getCampusById = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }
    res.json(campus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/campuses/{id}:
 *   put:
 *     summary: Atualizar um campus
 *     description: Atualiza as informações de um campus existente
 *     tags: [Campus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do campus
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
 *                 description: Nome do campus
 *                 example: Campus do Pici
 *               location:
 *                 type: string
 *                 maxLength: 255
 *                 description: Localização do campus
 *                 example: Fortaleza, CE
 *     responses:
 *       200:
 *         description: Campus atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campus'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateCampus = async (req, res) => {
  try {
    const { name, location } = req.body;
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }
    await campus.update({ name, location });
    res.json(campus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/campuses/{id}:
 *   delete:
 *     summary: Excluir um campus
 *     description: Remove um campus do sistema
 *     tags: [Campus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do campus
 *         example: 1
 *     responses:
 *       200:
 *         description: Campus excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Campus deleted
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteCampus = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus not found' });
    }
    await campus.destroy();
    res.json({ message: 'Campus deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};