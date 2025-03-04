// import { Router } from "express";
// import {
//   create,
//   findAll,
//   findBySearch,
//   findOne,
//   remove,
//   update,
// } from "../controllers/sohafan.controller.js";

// const sohaFanRoutes = Router();

// sohaFanRoutes.get("/", findAll);
// sohaFanRoutes.get("/query", findBySearch);
// sohaFanRoutes.get("/:id", findOne);
// sohaFanRoutes.post("/", create);
// sohaFanRoutes.patch("/:id", update);
// sohaFanRoutes.delete("/:id", remove);

// export default sohaFanRoutes;


import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/sohafan.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const sohaFanRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: SohaFan
 *   description: Operations related to SohaFan items
 */

/**
 * @swagger
 * /sohafan:
 *   get:
 *     tags: [SohaFan]
 *     description: Get all SohaFan items with pagination
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
 *         description: A list of SohaFan items
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
 *                       yonalishId:
 *                         type: integer
 *                       image:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum:
 *                           - soha
 *                           - fan
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
sohaFanRoutes.get("/", findAll);

/**
 * @swagger
 * /sohafan/query:
 *   get:
 *     tags: [SohaFan]
 *     description: Search for SohaFan items based on query parameters
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
 *         description: A list of SohaFan items matching the search criteria
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
 *                   yonalishId:
 *                     type: integer
 *                   image:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum:
 *                       - soha
 *                       - fan
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
sohaFanRoutes.get("/query", findBySearch);

/**
 * @swagger
 * /sohafan/{id}:
 *   get:
 *     tags: [SohaFan]
 *     description: Get a specific SohaFan item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the SohaFan item
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The SohaFan item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 yonalishId:
 *                   type: integer
 *                 image:
 *                   type: string
 *                 type:
 *                   type: string
 *                   enum:
 *                     - soha
 *                     - fan
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: SohaFan item not found
 */
sohaFanRoutes.get("/:id", findOne);

/**
 * @swagger
 * /sohafan:
 *   post:
 *     tags: [SohaFan]
 *     description: Create a new SohaFan item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               yonalishId:
 *                 type: integer
 *               image:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - soha
 *                   - fan
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: SohaFan item successfully created
 *       400:
 *         description: Bad request (invalid data)
 */
sohaFanRoutes.post("/", verifytoken, checkRole(["admin", "seo"]), create);

/**
 * @swagger
 * /sohafan/{id}:
 *   patch:
 *     tags: [SohaFan]
 *     description: Update an existing SohaFan item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the SohaFan item
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
 *               yonalishId:
 *                 type: integer
 *               image:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - soha
 *                   - fan
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: SohaFan item successfully updated
 *       400:
 *         description: Bad request (invalid data)
 *       404:
 *         description: SohaFan item not found
 */
sohaFanRoutes.patch("/:id", verifytoken, checkRole(["admin", "seo"]), update);

/**
 * @swagger
 * /sohafan/{id}:
 *   delete:
 *     tags: [SohaFan]
 *     description: Delete a SohaFan item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the SohaFan item to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: SohaFan item successfully deleted
 *       404:
 *         description: SohaFan item not found
 */
sohaFanRoutes.delete("/:id", verifytoken, checkRole(["admin", "seo"]), remove);

export default sohaFanRoutes;
