// import { Router } from "express";
// import upload from "../config/multer.js";

// const uploadRoute = Router()

// uploadRoute.post("/", upload.single('image'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send("file not found");
//     }
//     res.send(`Loaded successfully:  ${req.file.filename}  ✅`);
// });

// export default uploadRoute

import { Router } from "express";
import upload from "../config/multer.js";
import verifytoken from "../middleware/verifyToken.js";

const uploadRoute = Router();

/**
 * @swagger
 * tags:
 *   name: File Upload
 *   description: Operations for uploading files
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     tags: [File Upload]
 *     description: Upload a file (single file)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be uploaded
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Loaded successfully: <filename> ✅'
 *       400:
 *         description: No file provided or invalid file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'file not found'
 */
uploadRoute.post("/", verifytoken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "file not found" });
    }
    res.status(200).send({
        message: `Loaded successfully: ${req.file.filename} ✅`
    });
});

export default uploadRoute;