// import { Router } from "express";
// import {
//   create,
//   findAll,
//   findBySearch,
//   findOne,
//   remove,
//   update,
// } from "../controllers/region.controller.js";

// const regionRoute = Router();

// regionRoute.get("/", findAll);
// regionRoute.get("/query", findBySearch);
// regionRoute.get("/:id", findOne);
// regionRoute.post("/", create);
// regionRoute.patch("/:id", update);
// regionRoute.delete("/:id", remove);

// export default regionRoute;


import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/region.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const regionRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Region
 *   description: API for managing regions
 */

/**
 * @swagger
 * /region:
 *   get:
 *     tags:
 *       - Region
 *     summary: Get all Regions
 *     description: "Retrieve a paginated list of regions with related Filial and Oquv Markaz."
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "The page number for pagination (default: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pagesize
 *         description: "The number of records per page (default: 10)"
 *         schema:
 *           type: integer
 *           default: 10
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "A list of Regions"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the region"
 *                   name:
 *                     type: string
 *                     description: "The name of the region"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the region was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the region was last updated"
 *       500:
 *         description: "Server error"
 */
regionRoute.get("/", findAll);

/**
 * @swagger
 * /region/query:
 *   get:
 *     tags:
 *       - Region
 *     summary: "Search Regions by query parameters"
 *     description: "Filter and sort regions based on search parameters."
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
 *         description: "A filtered list of Regions"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the region"
 *                   name:
 *                     type: string
 *                     description: "The name of the region"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the region was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the region was last updated"
 *       500:
 *         description: "Server error"
 */
regionRoute.get("/query", findBySearch);

/**
 * @swagger
 * /region/{id}:
 *   get:
 *     tags:
 *       - Region
 *     summary: "Get a single Region by ID"
 *     description: "Retrieve a specific Region by its ID with related Filial and Oquv Markaz."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the Region to retrieve"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "The requested Region"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "The unique identifier for the region"
 *                 name:
 *                   type: string
 *                   description: "The name of the region"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the region was created"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the region was last updated"
 *       404:
 *         description: "Region not found"
 *       500:
 *         description: "Server error"
 */
regionRoute.get("/:id", findOne);

/**
 * @swagger
 * /region:
 *   post:
 *     tags:
 *       - Region
 *     summary: "Create a new Region"
 *     description: "Add a new Region to the database."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the region"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: "Region created successfully"
 *       400:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */
regionRoute.post("/", verifytoken, checkRole(["admin"]), create);

/**
 * @swagger
 * /region/{id}:
 *   patch:
 *     tags:
 *       - Region
 *     summary: "Update a Region by ID"
 *     description: "Modify an existing Region by its ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the Region to update"
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Region updated successfully"
 *       400:
 *         description: "Validation error"
 *       404:
 *         description: "Region not found"
 *       500:
 *         description: "Server error"
 */
regionRoute.patch("/:id", verifytoken, checkRole(["admin"]), update);

/**
 * @swagger
 * /region/{id}:
 *   delete:
 *     tags:
 *       - Region
 *     summary: "Delete a Region by ID"
 *     description: "Remove a Region from the database by its ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the Region to delete"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Region deleted successfully"
 *       404:
 *         description: "Region not found"
 *       500:
 *         description: "Server error"
 */
regionRoute.delete("/:id", verifytoken, checkRole(["admin"]), remove);

export default regionRoute;
