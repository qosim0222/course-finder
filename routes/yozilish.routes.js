// import { Router } from "express";
// import {
//   findAll,
//   findBySearch,
//   findOne,
//   create,
//   update,
//   remove,
// } from "../controllers/yozilish.controller.js";

// const yozilishRoute = Router();

// yozilishRoute.get("/", findAll);
// yozilishRoute.get("/query", findBySearch);
// yozilishRoute.get("/:id", findOne);
// yozilishRoute.post("/", create);
// yozilishRoute.patch("/:id", update);
// yozilishRoute.delete("/:id", remove);

// export default yozilishRoute;


import { Router } from "express";
import { findAll, findBySearch, findOne, create, update, remove } from "../controllers/yozilish.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const yozilishRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Yozilish
 *   description: Operations related to Yozilish items
 */

/**
 * @swagger
 * /yozilish:
 *   get:
 *     tags: [Yozilish]
 *     description: Get all Yozilish items with pagination
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default 1)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pagesize
 *         in: query
 *         description: Number of items per page (default 10)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Yozilish items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of items
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       yonalishId:
 *                         type: integer
 *                       oquvMarkazId:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
yozilishRoute.get("/", findAll);

/**
 * @swagger
 * /yozilish/query:
 *   get:
 *     tags: [Yozilish]
 *     description: Search for Yozilish items based on query parameters
 *     parameters:
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by (default "id")
 *         required: false
 *         schema:
 *           type: string
 *           default: "id"
 *       - name: order
 *         in: query
 *         description: Sort order ("asc" or "desc")
 *         required: false
 *         schema:
 *           type: string
 *           default: "asc"
 *       - name: limit
 *         in: query
 *         description: Number of items to retrieve (default 10)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default 1)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Yozilish items matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   yonalishId:
 *                     type: integer
 *                   oquvMarkazId:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
yozilishRoute.get("/query", findBySearch);

/**
 * @swagger
 * /yozilish/{id}:
 *   get:
 *     tags: [Yozilish]
 *     description: Get a specific Yozilish item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Yozilish item
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The Yozilish item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 yonalishId:
 *                   type: integer
 *                 oquvMarkazId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Yozilish item not found
 */
yozilishRoute.get("/:id", findOne);

/**
 * @swagger
 * /yozilish:
 *   post:
 *     tags: [Yozilish]
 *     description: Create a new Yozilish item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yonalishId:
 *                 type: integer
 *               oquvMarkazId:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Yozilish item created successfully
 *       400:
 *         description: Bad request (invalid data)
 */
yozilishRoute.post("/", verifytoken, create);

/**
 * @swagger
 * /yozilish/{id}:
 *   patch:
 *     tags: [Yozilish]
 *     description: Update an existing Yozilish item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Yozilish item
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               yonalishId:
 *                 type: integer
 *               oquvMarkazId:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Yozilish item updated successfully
 *       400:
 *         description: Bad request (invalid data)
 *       404:
 *         description: Yozilish item not found
 */
yozilishRoute.patch("/:id", verifytoken, checkRole(["admin"]), update);

/**
 * @swagger
 * /yozilish/{id}:
 *   delete:
 *     tags: [Yozilish]
 *     description: Delete a Yozilish item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Yozilish item to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Yozilish item deleted successfully
 *       404:
 *         description: Yozilish item not found
 */
yozilishRoute.delete("/:id", verifytoken, checkRole(["admin"]), remove);

export default yozilishRoute;
