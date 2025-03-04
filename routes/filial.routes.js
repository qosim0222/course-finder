// import { Router } from "express";
// import {
//   create,
//   findAll,
//   findBySearch,
//   findOne,
//   remove,
//   update,
// } from "../controllers/filial.controller.js";
// import upload from "../config/multer.js";

// const filialRoute = Router();

// filialRoute.get("/", findAll);
// filialRoute.get("/query", findBySearch);
// filialRoute.get("/:id", findOne);
// filialRoute.post("/", upload.single("image"), create);
// filialRoute.patch("/:id", update);
// filialRoute.delete("/:id", remove);

// export default filialRoute;


import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/filial.controller.js";
import upload from "../config/multer.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const filialRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Filial
 *     description: Filial management APIs
 */

/**
 * @swagger
 * /filial:
 *   get:
 *     tags: [Filial]
 *     summary: Get all filials
 *     description: Fetches a list of all filials with pagination and associated data (Oquvmarkaz and Region).
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
 *         description: A list of filials.
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
 *                   name:
 *                     type: string
 *                     example: "Filial 1"
 *                   address:
 *                     type: string
 *                     example: "1234 Main St, City, Country"
 *                   location:
 *                     type: string
 *                     example: "Point A"
 *                   image:
 *                     type: string
 *                     example: "image.jpg"
 *                   oquvMarkazId:
 *                     type: integer
 *                     example: 1
 *                   regionId:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Internal server error.
 */

filialRoute.get("/", findAll);

/**
 * @swagger
 * /filial/query:
 *   get:
 *     tags: [Filial]
 *     summary: Search for filials
 *     description: Search for filials based on various filters and query parameters.
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
 *         description: Returns a list of filials based on the query parameters.
 *       500:
 *         description: Internal server error.
 */

filialRoute.get("/query", findBySearch);

/**
 * @swagger
 * /filial/{id}:
 *   get:
 *     tags: [Filial]
 *     summary: Get a specific filial by ID
 *     description: Fetches a filial by its unique ID and includes associated data (Oquvmarkaz and Region).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the filial to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The filial object.
 *       404:
 *         description: Filial not found.
 *       500:
 *         description: Internal server error.
 */

filialRoute.get("/:id", findOne);

/**
 * @swagger
 * /filial:
 *   post:
 *     tags: [Filial]
 *     summary: Create a new filial
 *     description: Creates a new filial entry. Requires image upload.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Filial"
 *               address:
 *                 type: string
 *                 example: "1234 New Address, City, Country"
 *               location:
 *                 type: string
 *                 example: "New Location"
 *               image:
 *                 type: string
 *                 description: The image for the filial.
 *               oquvMarkazId:
 *                 type: integer
 *                 description: The image for the filial.
 *               regionId:
 *                 type: integer
 *                 description: The image for the filial.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Filial created successfully.
 *       400:
 *         description: Validation error or missing fields.
 *       500:
 *         description: Internal server error.
 */

filialRoute.post("/", verifytoken, checkRole(["admin", "seo"]), create);

/**
 * @swagger
 * /filial/{id}:
 *   patch:
 *     tags: [Filial]
 *     summary: Update a filial by ID
 *     description: Updates a filial's information based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the filial to update.
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
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *                 example: "updatedImage.jpg"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Filial updated successfully.
 *       400:
 *         description: Validation error or missing fields.
 *       404:
 *         description: Filial not found.
 *       500:
 *         description: Internal server error.
 */

filialRoute.patch("/:id", verifytoken, checkRole(["admin", "seo"]), update);

/**
 * @swagger
 * /filial/{id}:
 *   delete:
 *     tags: [Filial]
 *     summary: Delete a filial by ID
 *     description: Deletes a filial based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the filial to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Filial deleted successfully.
 *       404:
 *         description: Filial not found.
 *       500:
 *         description: Internal server error.
 */

filialRoute.delete("/:id", verifytoken, checkRole(["admin", "seo"]), remove);

export default filialRoute;
