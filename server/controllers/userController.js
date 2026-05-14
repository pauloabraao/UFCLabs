import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos os usuários
 *     description: Retorna uma lista com todos os usuários do sistema (excluindo senhas)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/User'
 *                   - type: object
 *                     properties:
 *                       password:
 *                         not: {}
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Criar um novo usuário
 *     description: Registra um novo usuário no sistema
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [campus_id, name, email, password, role]
 *             properties:
 *               campus_id:
 *                 type: integer
 *                 description: ID do campus
 *                 example: 1
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 maxLength: 100
 *                 format: email
 *                 description: Email do usuário
 *                 example: joao.silva@ufc.br
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Senha do usuário
 *                 example: senha123
 *               role:
 *                 type: string
 *                 enum: [administrador, professor, estudante, tecnico]
 *                 description: Papel do usuário
 *                 example: professor
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     password:
 *                       not: {}
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createUser = async (req, res) => {
  try {
    const { campus_id, name, email, password, role } = req.body;

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      campus_id,
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     description: Retorna um usuário específico pelo seu ID (excluindo senha)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     password:
 *                       not: {}
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     description: Atualiza as informações de um usuário existente
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do usuário
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
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 maxLength: 100
 *                 format: email
 *                 description: Email do usuário
 *                 example: joao.silva@ufc.br
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Nova senha do usuário
 *                 example: novasenha123
 *               role:
 *                 type: string
 *                 enum: [administrador, professor, estudante, tecnico]
 *                 description: Papel do usuário
 *                 example: professor
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     password:
 *                       not: {}
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateUser = async (req, res) => {
  try {
    const { campus_id, name, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prepare update data
    const updateData = { campus_id, name, email, role };

    // Hash password if it's being updated
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    await user.update(updateData);
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Excluir um usuário
 *     description: Remove um usuário do sistema
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login no sistema
 *     description: Autentica um usuário e retorna um token JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   allOf:
 *                     - $ref: '#/components/schemas/User'
 *                     - type: object
 *                       properties:
 *                         password:
 *                           not: {}
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email and password are required
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`[LOGIN] Attempting login with email: ${email}`);

    // Validate input
    if (!email || !password) {
      console.log(`[LOGIN] Missing email or password`);
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find user by email
    console.log(`[LOGIN] Looking up user with email: ${email}`);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`[LOGIN] User not found with email: ${email}`);
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    console.log(`[LOGIN] User found: ${user.name} (ID: ${user.user_id})`);
    console.log(
      `[LOGIN] Stored password hash (first 50 chars): ${user.password.substring(0, 50)}...`,
    );

    // Check password - support both bcrypt and SHA2 hashes
    let isPasswordValid = false;

    // Detect hash type: bcrypt hashes start with $2a$ or $2b$
    const isBcryptHash =
      user.password.startsWith("$2a$") || user.password.startsWith("$2b$");
    console.log(
      `[LOGIN] Hash type detected: ${isBcryptHash ? "bcrypt" : "SHA2 (hex)"}`,
    );

    if (isBcryptHash) {
      // Try bcrypt for new passwords
      console.log(`[LOGIN] Attempting bcrypt password comparison...`);
      try {
        isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`[LOGIN] Bcrypt comparison result: ${isPasswordValid}`);
      } catch (e) {
        console.log(`[LOGIN] Bcrypt comparison error: ${e.message}`);
        isPasswordValid = false;
      }
    } else {
      // Use SHA2 for legacy passwords
      console.log(`[LOGIN] Attempting SHA2 password comparison...`);
      const sha2Hash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      console.log(
        `[LOGIN] Computed SHA2 hash (first 50 chars): ${sha2Hash.substring(0, 50)}...`,
      );
      console.log(
        `[LOGIN] Stored hash (first 50 chars): ${user.password.substring(0, 50)}...`,
      );
      isPasswordValid = sha2Hash === user.password;
      console.log(`[LOGIN] SHA2 comparison result: ${isPasswordValid}`);
    }

    if (!isPasswordValid) {
      console.log(`[LOGIN] Password validation failed for user: ${email}`);
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    console.log(`[LOGIN] Password validation successful for user: ${email}`);

    // Generate JWT token
    console.log(`[LOGIN] Generating JWT token for user: ${email}`);
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        campus_id: user.campus_id,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toJSON();

    console.log(`[LOGIN] Login successful for user: ${email}`);
    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(`[LOGIN] Error during login:`, error);
    res.status(500).json({ error: error.message });
  }
};
