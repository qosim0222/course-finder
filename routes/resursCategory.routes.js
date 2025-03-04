// import express from "express";
// import {
//   createResursCategoriy,
//   deleteResursCategoriy,
//   findBySearchResursCategory,
//   getAllResursCategoriy,
//   getOneResursCategoriy,
//   updateResursCategoriy,
// } from "../controllers/resursCategory.controller.js";

// const resursCategoryRoute = express.Router();

// resursCategoryRoute.post("/", createResursCategoriy);
// resursCategoryRoute.get("/", getAllResursCategoriy);
// resursCategoryRoute.get("/query", findBySearchResursCategory);
// resursCategoryRoute.get("/:id", getOneResursCategoriy);
// resursCategoryRoute.patch("/:id", updateResursCategoriy);
// resursCategoryRoute.delete("/:id", deleteResursCategoriy);

// export default resursCategoryRoute;


import express from "express";
import {
  createResursCategoriy,
  deleteResursCategoriy,
  findBySearchResursCategory,
  getAllResursCategoriy,
  getOneResursCategoriy,
  updateResursCategoriy,
} from "../controllers/resursCategory.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const resursCategoryRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: ResursCategory
 *   description: API for managing resource categories
 */

/**
 * @swagger
 * /resurs-category:
 *   post:
 *     tags:
 *       - ResursCategory
 *     summary: "Create a new resource category"
 *     description: "Create a new resource category in the system"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the resource category"
 *               image:
 *                 type: string
 *                 description: "Image associated with the category"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: "Resource category created successfully"
 *       400:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */
resursCategoryRoute.post("/", verifytoken, checkRole(["admin"]), createResursCategoriy);

/**
 * @swagger
 * /resurs-category:
 *   get:
 *     tags:
 *       - ResursCategory
 *     summary: "Get all resource categories"
 *     description: "Retrieve all resource categories with pagination and associated resources"
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "Page number for pagination (default: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pagesize
 *         description: "Number of records per page (default: 10)"
 *         schema:
 *           type: integer
 *           default: 10
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "A list of resource categories"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the category"
 *                   name:
 *                     type: string
 *                     description: "Name of the category"
 *                   image:
 *                     type: string
 *                     description: "Image associated with the category"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the category was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the category was last updated"
 *       500:
 *         description: "Server error"
 */
resursCategoryRoute.get("/", getAllResursCategoriy);

/**
 * @swagger
 * /resurs-category/query:
 *   get:
 *     tags:
 *       - ResursCategory
 *     summary: "Search resource categories"
 *     description: "Search resource categories with optional filtering, sorting, and pagination"
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         description: "Field to sort by (default: id)"
 *         schema:
 *           type: string
 *           default: "id"
 *       - in: query
 *         name: order
 *         description: "Order direction (ASC/DESC)"
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - in: query
 *         name: limit
 *         description: "Number of records per page"
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
 *         description: "A filtered and sorted list of resource categories"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the category"
 *                   name:
 *                     type: string
 *                     description: "Name of the category"
 *                   image:
 *                     type: string
 *                     description: "Image associated with the category"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the category was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the category was last updated"
 *       500:
 *         description: "Server error"
 */
resursCategoryRoute.get("/query", findBySearchResursCategory);

/**
 * @swagger
 * /resurs-category/{id}:
 *   get:
 *     tags:
 *       - ResursCategory
 *     summary: "Get a single resource category by ID"
 *     description: "Retrieve a resource category by its ID with associated resources"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the category to retrieve"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "The requested resource category"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "The unique identifier for the category"
 *                 name:
 *                   type: string
 *                   description: "Name of the category"
 *                 image:
 *                   type: string
 *                   description: "Image associated with the category"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the category was created"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the category was last updated"
 *       404:
 *         description: "Resource category not found"
 *       500:
 *         description: "Server error"
 */
resursCategoryRoute.get("/:id", getOneResursCategoriy);

/**
 * @swagger
 * /resurs-category/{id}:
 *   patch:
 *     tags:
 *       - ResursCategory
 *     summary: "Update a resource category by ID"
 *     description: "Modify an existing resource category"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the category to update"
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
 *                 description: "Name of the category"
 *               image:
 *                 type: string
 *                 description: "Image associated with the category"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Resource category updated successfully"
 *       400:
 *         description: "Validation error"
 *       404:
 *         description: "Resource category not found"
 *       500:
 *         description: "Server error"
 */
resursCategoryRoute.patch("/:id", verifytoken, checkRole(["admin"]), updateResursCategoriy);

/**
 * @swagger
 * /resurs-category/{id}:
 *   delete:
 *     tags:
 *       - ResursCategory
 *     summary: "Delete a resource category by ID"
 *     description: "Delete an existing resource category"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the category to delete"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Resource category deleted successfully"
 *       404:
 *         description: "Resource category not found"
 *       500:
 *         description: "Server error"
 */
resursCategoryRoute.delete("/:id", verifytoken, checkRole(["admin"]), deleteResursCategoriy);

export default resursCategoryRoute;
