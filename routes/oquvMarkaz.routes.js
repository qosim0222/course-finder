// import { Router } from "express";
// import {
//   create,
//   findAll,
//   findBySearch,
//   findOne,
//   remove,
//   update,
// } from "../controllers/oquvMarkaz.controller.js";

// const oquvmarkazRoute = Router();

// oquvmarkazRoute.get("/", findAll);
// oquvmarkazRoute.get("/query", findBySearch);
// oquvmarkazRoute.get("/:id", findOne);
// oquvmarkazRoute.post("/", create);
// oquvmarkazRoute.patch("/:id", update);
// oquvmarkazRoute.delete("/:id", remove);

// export default oquvmarkazRoute;


import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/oquvMarkaz.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const oquvmarkazRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Oquvmarkaz
 *     description: Oquvmarkaz management APIs
 */

/**
 * @swagger
 * /oquv-markaz:
 *   get:
 *     tags: [Oquvmarkaz]
 *     summary: Get all Oquvmarkaz items
 *     description: Fetches a list of all Oquvmarkaz with pagination and associated data (User, Region, Filial, Comment, Liked, Yozilish).
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
 *         description: A list of Oquvmarkaz items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 50
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Oquv Markazi A"
 *                       address:
 *                         type: string
 *                         example: "123 Oquvmarkaz Street"
 *                       location:
 *                         type: string
 *                         example: "Tashkent"
 *                       regionId:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal server error.
 */

oquvmarkazRoute.get("/", findAll);

/**
 * @swagger
 * /oquv-markaz/query:
 *   get:
 *     tags: [Oquvmarkaz]
 *     summary: Search Oquvmarkaz items
 *     description: Search Oquvmarkaz based on query parameters such as name, address, region, etc.
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a filtered list of Oquvmarkaz items.
 *       500:
 *         description: Internal server error.
 */

oquvmarkazRoute.get("/query", findBySearch);

/**
 * @swagger
 * /oquv-markaz/{id}:
 *   get:
 *     tags: [Oquvmarkaz]
 *     summary: Get a specific Oquvmarkaz item by ID
 *     description: Fetches a specific Oquvmarkaz by its unique ID, including associated data like User, Region, Filial, Comment, Liked, and Yozilish.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Oquvmarkaz to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The Oquvmarkaz object.
 *       404:
 *         description: Oquvmarkaz not found.
 *       500:
 *         description: Internal server error.
 */

oquvmarkazRoute.get("/:id", findOne);

/**
 * @swagger
 * /oquv-markaz:
 *   post:
 *     tags: [Oquvmarkaz]
 *     summary: Create a new Oquvmarkaz
 *     description: Creates a new Oquvmarkaz item. Requires the name, address, location, image and regionId fields in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the Oquvmarkaz.
 *                 example: "Oquv Markazi A"
 *               filialSoni:
 *                 type: integer
 *                 description: Number of Filials of the Oquvmarkaz.
 *                 example: 0
 *               address:
 *                 type: string
 *                 description: The address of the Oquvmarkaz.
 *                 example: "123 Oquvmarkaz Street"
 *               location:
 *                 type: string
 *                 description: The location of the Oquvmarkaz.
 *                 example: "Tashkent"
 *               regionId:
 *                 type: integer
 *                 description: The ID of the region the Oquvmarkaz belongs to.
 *                 example: 1
 *               image:
 *                 type: string
 *                 description: Image of Oquv Markaz
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Oquvmarkaz created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

oquvmarkazRoute.post("/", verifytoken, checkRole(["admin", "seo"]), create);

/**
 * @swagger
 * /oquv-markaz/{id}:
 *   patch:
 *     tags: [Oquvmarkaz]
 *     summary: Update an existing Oquvmarkaz item
 *     description: Updates an Oquvmarkaz item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Oquvmarkaz to update.
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
 *               name:
 *                 type: string
 *                 description: The updated name of the Oquvmarkaz.
 *                 example: "Updated Oquv Markazi A"
 *               address:
 *                 type: string
 *                 description: The updated address of the Oquvmarkaz.
 *                 example: "456 New Oquvmarkaz Street"
 *               location:
 *                 type: string
 *                 description: The updated location of the Oquvmarkaz.
 *                 example: "Samarkand"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Oquvmarkaz updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Oquvmarkaz not found.
 *       500:
 *         description: Internal server error.
 */

oquvmarkazRoute.patch("/:id", verifytoken, checkRole(["admin", "seo"]), update);

/**
 * @swagger
 * /oquv-markaz/{id}:
 *   delete:
 *     tags: [Oquvmarkaz]
 *     summary: Delete an Oquvmarkaz item
 *     description: Deletes a specific Oquvmarkaz by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Oquvmarkaz to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Oquvmarkaz deleted successfully.
 *       404:
 *         description: Oquvmarkaz not found.
 *       500:
 *         description: Internal server error.
 */

oquvmarkazRoute.delete("/:id", verifytoken, checkRole(["admin", "seo"]), remove);

export default oquvmarkazRoute;