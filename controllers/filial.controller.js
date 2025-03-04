import Filial from "../models/filial.model.js";
import Oquvmarkaz from "../models/oquvMarkaz.model.js";
import Region from "../models/region.model.js";
import { filialUpdate } from "../validations/updateValidations.js";
import { filialValidation } from "../validations/validations.js";
import { Op } from "sequelize";

async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pagesize = parseInt(req.query.page) || 10;
        const offset = (page - 1) * pagesize;

        let data = await Filial.findAll({
            limit: pagesize, offset: offset,
            include: [{ model: Oquvmarkaz }, { model: Region }]
        })
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

        let data = await Filial.findAll({
            where: newObj,
            order: order,
            limit: limit,
            offset: offset,
            include: [{ model: Oquvmarkaz }, { model: Region }]
        });

        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
async function findOne(req, res) {
    try {
        let data = await Filial.findByPk(req.params.id, {
            include: [{ model: Oquvmarkaz }, { model: Region }]
        })
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function create(req, res) {
    try {
        let { error, value } = filialValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        let newData = await Filial.create(req.body)
        res.status(201).send(newData)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function update(req, res) {
    try {
        let { error, value } = filialUpdate.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        let data = await Filial.update(req.body, { where: { id: req.params.id } })
        res.send("updated successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function remove(req, res) {
    try {
        await Filial.destroy({ where: { id: req.params.id } })
        res.send("deleted successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};

export { findAll, findBySearch, findOne, create, update, remove }