// import { Router } from "express";
// import {
//   create,
//   findAll,
//   findBySearch,
//   findOne,
//   remove,
// } from "../controllers/liked.controller.js";

// const likedRoute = Router();

// likedRoute.get("/", findAll);
// likedRoute.get("/query", findBySearch);
// likedRoute.get("/:id", findOne);
// likedRoute.post("/", create);
// likedRoute.delete("/:id", remove);

// export default likedRoute;


import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
} from "../controllers/liked.controller.js";
import verifytoken from "../middleware/verifyToken.js";

const likedRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Liked
 *     description: Liked management APIs
 */

/**
 * @swagger
 * /liked:
 *   get:
 *     tags: [Liked]
 *     summary: Get all liked items
 *     description: Fetches a list of all liked items with pagination and associated data (User and Oquvmarkaz).
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pagesize
 *         required: false
 *         description: The number of items per page.
 *         schema:
 *           type: integer
 *           default: 10
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of liked items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 3
 *                   oquvMarkazId:
 *                     type: integer
 *                     example: 5
 *       500:
 *         description: Internal server error.
 */

likedRoute.get("/", findAll);

/**
 * @swagger
 * /liked/query:
 *   get:
 *     tags: [Liked]
 *     summary: Search liked items
 *     description: Search liked items based on various filters and query parameters.
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of results per page.
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
 *         description: The sort order (ASC or DESC).
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pagesize
 *         required: false
 *         description: The number of items per page.
 *         schema:
 *           type: integer
 *           default: 10
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of liked items based on the query parameters.
 *       500:
 *         description: Internal server error.
 */

likedRoute.get("/query", findBySearch);

/**
 * @swagger
 * /liked/{id}:
 *   get:
 *     tags: [Liked]
 *     summary: Get a specific liked item by ID
 *     description: Fetches a liked item by its unique ID and includes associated data (User and Oquvmarkaz).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the liked item to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The liked item object.
 *       404:
 *         description: Liked item not found.
 *       500:
 *         description: Internal server error.
 */

likedRoute.get("/:id", findOne);

/**
 * @swagger
 * /liked:
 *   post:
 *     tags: [Liked]
 *     summary: Like an Oquvmarkaz
 *     description: Creates a new like for a specific Oquvmarkaz by a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oquvMarkazId:
 *                 type: integer
 *                 description: The ID of the Oquvmarkaz being liked.
 *                 example: 3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Liked successfully.
 *       400:
 *         description: Validation error or already liked.
 *       500:
 *         description: Internal server error.
 */

likedRoute.post("/", verifytoken, create);

/**
 * @swagger
 * /liked/{id}:
 *   delete:
 *     tags: [Liked]
 *     summary: Remove a like by ID
 *     description: Removes a like for a specific Oquvmarkaz by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the like to remove.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unliked successfully.
 *       404:
 *         description: Like not found.
 *       500:
 *         description: Internal server error.
 */

likedRoute.delete("/:id", verifytoken, remove);

export default likedRoute;
