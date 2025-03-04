import Liked from "../models/liked.model.js";
import Oquvmarkaz from "../models/oquvMarkaz.model.js";
import User from "../models/user.model.js";
import { likedValidation } from "../validations/validations.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken"

async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pagesize = parseInt(req.query.page) || 10;
        const offset = (page - 1) * pagesize;

        let data = await Liked.findAll({
            limit: pagesize, offset: offset,
            include: [{ model: User, attributes: ["fullname", "phone", "image", "email", "role"] }, { model: Oquvmarkaz }]
        });
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function findBySearch(req, res) {
    try {
        console.log(req.query);
        let query = req.query;
        let newObj = {};
        let order = [];

        let sortBy = query.sortBy || "id";
        let sortOrder = query.order?.toLowerCase() === "desc" ? "DESC" : "ASC";

        let createdAtOrder = query.createdAt?.toLowerCase() === "asc" ? "ASC" : "DESC";

        Object.keys(query).forEach((key) => {
            if (!["order", "createdAt", "limit", "page", "sortBy"].includes(key)) {
                newObj[key] = { [Op.like]: `%${query[key]}%` };
            }
        });

        order.push([sortBy, sortOrder]);
        if (sortBy !== "createdAt") {
            order.push(["createdAt", createdAtOrder]);
        }

        let limit = parseInt(query.limit) || 10;
        let page = parseInt(query.page) || 1;
        let offset = (page - 1) * limit;

        console.log("Query:", newObj);
        console.log("Order By:", order);
        console.log("Pagination:", { limit, offset });

        let data = await Liked.findAll({
            where: newObj,
            order: order,
            limit: limit,
            offset: offset,
            include: [{ model: User, attributes: ["fullname", "phone", "image", "email", "role"] }, { model: Oquvmarkaz }]
        });

        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
async function findOne(req, res) {
    try {
        let data = await Liked.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["fullname", "phone", "image", "email", "role"] }, { model: Oquvmarkaz }]
        })
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function create(req, res) {
    try {
        let token = req.header("Authorization").split(" ").at(-1);
        let data = jwt.verify(token, process.env.JWT_SECRET_KEY);

        let { error, value } = likedValidation.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        req.body.userId = data.id;
        let existingLike = await Liked.findOne({ where: { userId: req.body.userId, oquvMarkazId: req.body.oquvMarkazId } });
        if (existingLike) {
            return res.status(400).send("you already liked");
        }
        let newData = await Liked.create(req.body);
        res.status(201).send(newData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
async function remove(req, res) {
    try {
        await Liked.destroy({ where: { id: req.params.id } })
        res.send("unliked successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};

export { findAll, findBySearch, findOne, create, remove }