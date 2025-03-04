// import { Router } from "express";
// import { create, findAll, findBySearch, findOne, remove } from "../controllers/comment.controller.js";

// const commentRoute = Router();

// commentRoute.get("/", findAll);
// commentRoute.get("/query", findBySearch);
// commentRoute.get("/:id", findOne);
// commentRoute.post("/", create);
// commentRoute.delete("/:id", remove);

// export default commentRoute;

import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove } from "../controllers/comment.controller.js";
import verifytoken from "../middleware/verifyToken.js";

const commentRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: API for managing Comments
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get all Comments
 *     description: "Retrieve a paginated list of comments with related User and Oquv Markaz."
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "The page number for pagination (default: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: "The number of records per page (default: 10)"
 *         schema:
 *           type: integer
 *           default: 10
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "A list of Comments"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: "Server error"
 */
commentRoute.get("/", findAll);

/**
 * @swagger
 * /comment/query:
 *   get:
 *     tags:
 *       - Comment
 *     summary: "Search Comments by query parameters"
 *     description: "Filter and sort comments based on search parameters."
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         description: "Field to sort by (default: id)"
 *         schema:
 *           type: string
 *           default: "id"
 *       - in: query
 *         name: order
 *         description: "Order of the sort (ASC/DESC)"
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - in: query
 *         name: limit
 *         description: "The number of records per page"
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         description: "Page number for pagination"
 *         schema:
 *           type: integer
 *           default: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "A filtered list of Comments"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: "Server error"
 */
commentRoute.get("/query", findBySearch);

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     tags:
 *       - Comment
 *     summary: "Get a single Comment by ID"
 *     description: "Retrieve a specific Comment by its ID with related User and Oquv Markaz."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the Comment to retrieve"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "The requested Comment"
 *         content:
 *           application/json:
 *       404:
 *         description: "Comment not found"
 *       500:
 *         description: "Server error"
 */
commentRoute.get("/:id", verifytoken, findOne);

/**
 * @swagger
 * /comment:
 *   post:
 *     tags:
 *       - Comment
 *     summary: "Create a new Comment"
 *     description: "Add a new Comment to the database."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *               star:
 *                 type: integer
 *               oquvMarkazId:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: "Comment created successfully"
 *       400:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */
commentRoute.post("/", verifytoken, create);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: "Delete a Comment by ID"
 *     description: "Remove a Comment from the database by its ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the Comment to delete"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Comment deleted successfully"
 *       404:
 *         description: "Comment not found"
 *       500:
 *         description: "Server error"
 */
commentRoute.delete("/:id", verifytoken, remove);

export default commentRoute;
