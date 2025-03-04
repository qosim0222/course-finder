// import { Router } from "express";
// import {
//   findAll,
//   findBySearch,
//   findOne,
//   create,
//   update,
//   remove,
// } from "../controllers/yonalish.controller.js";

// const yonalishRoute = Router();

// yonalishRoute.get("/", findAll);
// yonalishRoute.get("/query", findBySearch);
// yonalishRoute.get("/:id", findOne);
// yonalishRoute.post("/", create);
// yonalishRoute.patch("/:id", update);
// yonalishRoute.delete("/:id", remove);

// export default yonalishRoute;


import { Router } from "express";
import {
  findAll,
  findBySearch,
  findOne,
  create,
  update,
  remove,
} from "../controllers/yonalish.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const yonalishRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Yonalish
 *   description: Operations related to Yonalish items
 */

/**
 * @swagger
 * /yonalish:
 *   get:
 *     tags: [Yonalish]
 *     description: Get all Yonalish items with pagination
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
 *         description: A list of Yonalish items
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
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
yonalishRoute.get("/", findAll);

/**
 * @swagger
 * /yonalish/query:
 *   get:
 *     tags: [Yonalish]
 *     description: Search for Yonalish items based on query parameters
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
 *         description: A list of Yonalish items matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
yonalishRoute.get("/query", findBySearch);

/**
 * @swagger
 * /yonalish/{id}:
 *   get:
 *     tags: [Yonalish]
 *     description: Get a specific Yonalish item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Yonalish item
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The Yonalish item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Yonalish item not found
 */
yonalishRoute.get("/:id", findOne);

/**
 * @swagger
 * /yonalish:
 *   post:
 *     tags: [Yonalish]
 *     description: Create a new Yonalish item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               oquvMarkazId:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Yonalish item created successfully
 *       400:
 *         description: Bad request (invalid data)
 */
yonalishRoute.post("/", verifytoken, checkRole(["admin", "seo"]), create);

/**
 * @swagger
 * /yonalish/{id}:
 *   patch:
 *     tags: [Yonalish]
 *     description: Update an existing Yonalish item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Yonalish item
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Yonalish item updated successfully
 *       400:
 *         description: Bad request (invalid data)
 *       404:
 *         description: Yonalish item not found
 */
yonalishRoute.patch("/:id", verifytoken, checkRole(["admin", "seo"]), update);

/**
 * @swagger
 * /yonalish/{id}:
 *   delete:
 *     tags: [Yonalish]
 *     description: Delete a Yonalish item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Yonalish item to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Yonalish item deleted successfully
 *       404:
 *         description: Yonalish item not found
 */
yonalishRoute.delete("/:id", verifytoken, checkRole(["admin", "seo"]), remove);

export default yonalishRoute;
