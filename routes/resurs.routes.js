// import express from "express";
// import {
//   createResurs,
//   deleteResurs,
//   findBySearchResurs,
//   getAllResurs,
//   getOneResurs,
//   updateResurs,
// } from "../controllers/resurs.controller.js";

// const resursRoute = express.Router();

// resursRoute.post("/", createResurs);
// resursRoute.get("/", getAllResurs);
// resursRoute.get("/query", findBySearchResurs);
// resursRoute.get("/:id", getOneResurs);
// resursRoute.patch("/:id", updateResurs);
// resursRoute.delete("/:id", deleteResurs);

// export default resursRoute;


import express from "express";
import {
  createResurs,
  deleteResurs,
  findBySearchResurs,
  getAllResurs,
  getOneResurs,
  updateResurs,
} from "../controllers/resurs.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const resursRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resurs
 *   description: API for managing resources
 */

/**
 * @swagger
 * /resurs:
 *   post:
 *     tags:
 *       - Resurs
 *     summary: "Create a new resource"
 *     description: "Create a new resource in the system"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the resource"
 *               media:
 *                 type: string
 *                 description: "Media URL or identifier of the resource"
 *               desc:
 *                 type: string
 *                 description: "Description of the resource"
 *               resursCategoryId:
 *                 type: integer
 *                 description: "id of Category of resurs"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: "Resource created successfully"
 *       400:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */
resursRoute.post("/", verifytoken, createResurs);

/**
 * @swagger
 * /resurs:
 *   get:
 *     tags:
 *       - Resurs
 *     summary: "Get all resources"
 *     description: "Retrieve all resources with pagination and associated user and category information"
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
 *         description: "A list of resources"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the resource"
 *                   userId:
 *                     type: integer
 *                     description: "ID of the user who owns the resource"
 *                   name:
 *                     type: string
 *                     description: "Name of the resource"
 *                   media:
 *                     type: string
 *                     description: "Media URL or identifier of the resource"
 *                   desc:
 *                     type: string
 *                     description: "Description of the resource"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource was last updated"
 *       500:
 *         description: "Server error"
 */
resursRoute.get("/", getAllResurs);

/**
 * @swagger
 * /resurs/query:
 *   get:
 *     tags:
 *       - Resurs
 *     summary: "Search resources"
 *     description: "Search resources with optional filtering, sorting, and pagination"
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
 *         description: "A filtered and sorted list of resources"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the resource"
 *                   userId:
 *                     type: integer
 *                     description: "ID of the user who owns the resource"
 *                   name:
 *                     type: string
 *                     description: "Name of the resource"
 *                   media:
 *                     type: string
 *                     description: "Media URL or identifier of the resource"
 *                   desc:
 *                     type: string
 *                     description: "Description of the resource"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource was last updated"
 *       500:
 *         description: "Server error"
 */
resursRoute.get("/query", findBySearchResurs);

/**
 * @swagger
 * /resurs/{id}:
 *   get:
 *     tags:
 *       - Resurs
 *     summary: "Get a single resource by ID"
 *     description: "Retrieve a resource by its ID with associated user and category"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the resource to retrieve"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "The requested resource"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "The unique identifier for the resource"
 *                 userId:
 *                   type: integer
 *                   description: "ID of the user who owns the resource"
 *                 name:
 *                   type: string
 *                   description: "Name of the resource"
 *                 media:
 *                   type: string
 *                   description: "Media URL or identifier of the resource"
 *                 desc:
 *                   type: string
 *                   description: "Description of the resource"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the resource was created"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the resource was last updated"
 *       404:
 *         description: "Resource not found"
 *       500:
 *         description: "Server error"
 */
resursRoute.get("/:id", getOneResurs);

/**
 * @swagger
 * /resurs/{id}:
 *   patch:
 *     tags:
 *       - Resurs
 *     summary: "Update a resource by ID"
 *     description: "Modify an existing resource"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the resource to update"
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
 *                 description: "The ID of the user who owns the resource"
 *               name:
 *                 type: string
 *                 description: "Name of the resource"
 *               media:
 *                 type: string
 *                 description: "Media URL or identifier of the resource"
 *               desc:
 *                 type: string
 *                 description: "Description of the resource"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Resource updated successfully"
 *       400:
 *         description: "Validation error"
 *       404:
 *         description: "Resource not found"
 *       500:
 *         description: "Server error"
 */
resursRoute.patch("/:id", verifytoken, updateResurs);

/**
 * @swagger
 * /resurs/{id}:
 *   delete:
 *     tags:
 *       - Resurs
 *     summary: "Delete a resource by ID"
 *     description: "Delete an existing resource"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the resource to delete"
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Resource deleted successfully"
 *       404:
 *         description: "Resource not found"
 *       500:
 *         description: "Server error"
 */
resursRoute.delete("/:id", verifytoken, checkRole(["admin"]), deleteResurs);

export default resursRoute;
