import ComputerIssue from "../models/ComputerIssue.js";

// Enums válidos
const VALID_STATUS = ["reportado", "em analise", "resolvido", "fechado"];
const VALID_COMPONENTS = ["hardware", "software", "rede"];

/**
 * Valida os dados de entrada para criar/atualizar um problema
 * @param {Object} data - Dados a validar
 * @param {boolean} isUpdate - Se é uma atualização (campos opcionais)
 * @returns {Object} - { isValid: boolean, errors: Array }
 */
const validateComputerIssueData = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate) {
    // Validações para criação (todos os campos obrigatórios)
    if (!data.computer_id) {
      errors.push("computer_id é obrigatório");
    } else if (!Number.isInteger(data.computer_id) || data.computer_id <= 0) {
      errors.push("computer_id deve ser um número inteiro positivo");
    }

    if (!data.reported_by) {
      errors.push("reported_by é obrigatório");
    } else if (!Number.isInteger(data.reported_by) || data.reported_by <= 0) {
      errors.push("reported_by deve ser um número inteiro positivo");
    }

    if (!data.description) {
      errors.push("description é obrigatório");
    } else if (
      typeof data.description !== "string" ||
      data.description.trim().length === 0
    ) {
      errors.push("description deve ser uma string não vazia");
    } else if (data.description.length > 500) {
      errors.push("description não pode exceder 500 caracteres");
    }

    if (!data.date_reported) {
      errors.push("date_reported é obrigatório");
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date_reported)) {
      errors.push("date_reported deve estar no formato YYYY-MM-DD");
    } else if (new Date(data.date_reported) > new Date()) {
      errors.push("date_reported não pode ser uma data futura");
    }

    if (!data.status) {
      errors.push("status é obrigatório");
    } else if (!VALID_STATUS.includes(data.status)) {
      errors.push(
        `status deve ser um dos seguintes: ${VALID_STATUS.join(", ")}`,
      );
    }

    if (!data.component) {
      errors.push("component é obrigatório");
    } else if (!VALID_COMPONENTS.includes(data.component)) {
      errors.push(
        `component deve ser um dos seguintes: ${VALID_COMPONENTS.join(", ")}`,
      );
    }
  } else {
    // Validações para atualização (campos opcionais)
    if (
      data.computer_id !== undefined &&
      (!Number.isInteger(data.computer_id) || data.computer_id <= 0)
    ) {
      errors.push("computer_id deve ser um número inteiro positivo");
    }

    if (
      data.reported_by !== undefined &&
      (!Number.isInteger(data.reported_by) || data.reported_by <= 0)
    ) {
      errors.push("reported_by deve ser um número inteiro positivo");
    }

    if (data.description !== undefined) {
      if (
        typeof data.description !== "string" ||
        data.description.trim().length === 0
      ) {
        errors.push("description deve ser uma string não vazia");
      } else if (data.description.length > 500) {
        errors.push("description não pode exceder 500 caracteres");
      }
    }

    if (data.date_reported !== undefined) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date_reported)) {
        errors.push("date_reported deve estar no formato YYYY-MM-DD");
      } else if (new Date(data.date_reported) > new Date()) {
        errors.push("date_reported não pode ser uma data futura");
      }
    }

    if (data.status !== undefined && !VALID_STATUS.includes(data.status)) {
      errors.push(
        `status deve ser um dos seguintes: ${VALID_STATUS.join(", ")}`,
      );
    }

    if (
      data.component !== undefined &&
      !VALID_COMPONENTS.includes(data.component)
    ) {
      errors.push(
        `component deve ser um dos seguintes: ${VALID_COMPONENTS.join(", ")}`,
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

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
    console.error("Erro ao buscar problemas de computadores:", error);
    res.status(500).json({
      error: "Erro ao recuperar lista de problemas",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
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
    const {
      computer_id,
      reported_by,
      description,
      date_reported,
      status,
      component,
    } = req.body;

    // Validar dados de entrada
    const validation = validateComputerIssueData(req.body, false);
    if (!validation.isValid) {
      return res.status(400).json({
        error: "Dados de entrada inválidos",
        details: validation.errors,
      });
    }

    const newIssue = await ComputerIssue.create({
      computer_id,
      reported_by,
      description: description.trim(),
      date_reported,
      status,
      component,
    });

    res.status(201).json(newIssue);
  } catch (error) {
    console.error("Erro ao criar problema de computador:", error);

    // Tratamento de erros específicos
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação do banco de dados",
        details: error.errors.map((e) => e.message),
      });
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        error: "Referência inválida",
        message: "O computador ou usuário informado não existe",
      });
    }

    res.status(500).json({
      error: "Erro ao reportar problema",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
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
 *       400:
 *         description: ID inválido
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getComputerIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        error: "ID inválido",
        message: "O ID deve ser um número inteiro positivo",
      });
    }

    const issue = await ComputerIssue.findByPk(id);
    if (!issue) {
      return res.status(404).json({
        error: "Problema não encontrado",
        message: `Nenhum problema de computador encontrado com ID ${id}`,
      });
    }

    res.json(issue);
  } catch (error) {
    console.error("Erro ao buscar problema por ID:", error);
    res.status(500).json({
      error: "Erro ao buscar problema",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateComputerIssue = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        error: "ID inválido",
        message: "O ID deve ser um número inteiro positivo",
      });
    }

    // Validar se há dados para atualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Nenhum dado fornecido",
        message: "Pelo menos um campo deve ser fornecido para atualizar",
      });
    }

    // Validar dados de entrada
    const validation = validateComputerIssueData(req.body, true);
    if (!validation.isValid) {
      return res.status(400).json({
        error: "Dados de entrada inválidos",
        details: validation.errors,
      });
    }

    const issue = await ComputerIssue.findByPk(id);
    if (!issue) {
      return res.status(404).json({
        error: "Problema não encontrado",
        message: `Nenhum problema de computador encontrado com ID ${id}`,
      });
    }

    // Preparar dados para atualização (trim em strings)
    const updateData = { ...req.body };
    if (updateData.description) {
      updateData.description = updateData.description.trim();
    }

    await issue.update(updateData);
    res.json(issue);
  } catch (error) {
    console.error("Erro ao atualizar problema de computador:", error);

    // Tratamento de erros específicos
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Erro de validação do banco de dados",
        details: error.errors.map((e) => e.message),
      });
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        error: "Referência inválida",
        message: "O computador ou usuário informado não existe",
      });
    }

    res.status(500).json({
      error: "Erro ao atualizar problema",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteComputerIssue = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        error: "ID inválido",
        message: "O ID deve ser um número inteiro positivo",
      });
    }

    const issue = await ComputerIssue.findByPk(id);
    if (!issue) {
      return res.status(404).json({
        error: "Problema não encontrado",
        message: `Nenhum problema de computador encontrado com ID ${id}`,
      });
    }

    await issue.destroy();
    res.json({
      message: "Problema de computador deletado com sucesso",
      deletedId: id,
    });
  } catch (error) {
    console.error("Erro ao deletar problema de computador:", error);
    res.status(500).json({
      error: "Erro ao deletar problema",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
