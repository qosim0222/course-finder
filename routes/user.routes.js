import { Router } from "express";
import { findAll, findBySearch, findOne, login, myInfo, register, registerAdmin, remove, resetPassword, sendOtp, update } from "../controllers/user.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import selfpolice from "../middleware/selfPolice.js";
import checkRole from "../middleware/rolePolice.js";

let userRoute = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management APIs
 */

/**
 * @swagger
 * /user/send-otp:
 *   post:
 *     tags: [User]
 *     summary: Send OTP to the provided email
 *     description: Generates and sends a one-time password (OTP) to the specified email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@gmail.com
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       500:
 *         description: Internal server error.
*/

userRoute.post("/send-otp", sendOtp);

/**
 * @swagger
 * /user/register/{otp}:
 *   post:
 *     tags: [User]
 *     summary: Register a new user
 *     description: Registers a new user after validating the OTP sent to the provided email.
 *     parameters:
 *       - in: path
 *         name: otp
 *         required: true
 *         description: The OTP received via email.
 *         schema:
 *           type: string
 *           example: "123456"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: "+998999999999"
 *               password:
 *                 type: string
 *                 example: "1234"
 *               email:
 *                 type: string
 *                 example: "user@gmail.com"
 *               role:
 *                 type: string
 *                 enum: [user, seo, admin]
 *                 example: "user"
 *               image:
 *                 type: string
 *                 example: "profile.jpg"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation or OTP error.
 *       500:
 *         description: Internal server error.
*/

userRoute.post("/register/:otp", register);

/**
 * @swagger
 * /user/registerAdmin/{otp}:
 *   post:
 *     tags: [User]
 *     summary: Register a new admin user
 *     description: Registers a new admin user after validating the OTP sent to the provided email.
 *     parameters:
 *       - in: path
 *         name: otp
 *         required: true
 *         description: The OTP received via email.
 *         schema:
 *           type: string
 *           example: "123456"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: "+998999999999"
 *               password:
 *                 type: string
 *                 example: "1234"
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               role:
 *                 type: string
 *                 enum: [user, seo, admin]
 *                 example: "admin"
 *               image:
 *                 type: string
 *                 example: "adminProfile.jpg"
 *     responses:
 *       201:
 *         description: Admin user registered successfully.
 *       400:
 *         description: Validation or OTP error.
 *       500:
 *         description: Internal server error.
*/

userRoute.post("/registerAdmin/:otp", registerAdmin);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [User]
 *     summary: User login
 *     description: Logs a user in and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@gmail.com"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged in and returns a JWT token.
 *       400:
 *         description: Incorrect password.
 *       403:
 *         description: Email not found.
 *       500:
 *         description: Internal server error.
*/

userRoute.post("/login", login);

/**
 * @swagger
 * /user/query:
 *   get:
 *     tags: [User]
 *     summary: Search for users
 *     description: Search for users with optional filtering and sorting.
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Limit the number of results returned.
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: The field by which to sort the results.
 *         schema:
 *           type: string
 *           default: "id"
 *       - in: query
 *         name: order
 *         required: false
 *         description: Sort order (ASC or DESC).
 *         schema:
 *           type: string
 *           default: "ASC"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of users based on the query parameters.
 *       400:
 *         description: Invalid query parameters.
 *       500:
 *         description: Internal server error.
*/

userRoute.get("/query", findBySearch);

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Fetches a list of all users with pagination.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullname:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *       500:
 *         description: Internal server error.
 */

userRoute.get("/", verifytoken, findAll);


/**
 * @swagger
 * /user/my-info:
 *   get:
 *     tags: [User]
 *     summary: Get all my infos
 *     description: Fetches a list of self infos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of infos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullname:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *       500:
 *         description: Internal server error.
 */

userRoute.get("/my-info", verifytoken, myInfo);


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get a specific user by ID
 *     description: Fetches a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to fetch.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user data.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

userRoute.get("/:id", verifytoken, selfpolice(["admin", "seo", "user"]), findOne);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     tags: [User]
 *     summary: Update user information
 *     description: Updates the information of an existing user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               image:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
*/

userRoute.patch("/:id", verifytoken, selfpolice(['admin', "user", "seo"]), update);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user by ID
 *     description: Deletes the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
*/

userRoute.delete("/:id", verifytoken, checkRole(["admin", "seo"]), remove);


/**
 * @swagger
 * /send-reset-password:
 *   post:
 *     tags: [User]
 *     summary: Send OTP to the provided email
 *     description: Generates and sends a one-time password (OTP) to the specified email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@gmail.com
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       500:
 *         description: Internal server error.
*/

userRoute.post('/send-reset-password', resetPassword)

/**
 * @swagger
 * /reset-password:
 *   post:
 *     tags: [User]
 *     summary: Send OTP to the provided email
 *     description: Generates and sends a one-time password (OTP) to the specified email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@gmail.com
 *               otp:
 *                 type: integer
 *                 description: The otp sended to email
 *                 example: user@gmail.com
 *               newPassword:
 *                 type: integer
 *                 description: The otp sended to email
 *                 example: user@gmail.com
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       500:
 *         description: Internal server error.
*/

userRoute.post('/reset-password', resetPassword)

export default userRoute;