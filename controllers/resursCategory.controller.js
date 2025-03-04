import Resurs from "../models/resurs.model.js";
import resursCategory from "../models/resursCategory.model.js";
import {
  resursCategoryUpdate,
  resursCategoryValidation,
} from "../validations/resursValidation.js";
import { Op } from "sequelize";

const createResursCategoriy = async (req, res) => {
  try {
    let { error, value } = resursCategoryValidation.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    let newData = await resursCategory.create(req.body);
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurs yaratishda xatolik" });
  }
};

const getAllResursCategoriy = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pagesize = parseInt(req.query.page) || 10;
    const offset = (page - 1) * pagesize;

    const resursList = await resursCategory.findAll({
      limit: pagesize,
      offset: offset,
      include: [{ model: Resurs }]
    });
    res.status(200).json(resursList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurslarni olishda xatolik" });
  }
};

async function findBySearchResursCategory(req, res) {
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

    let data = await resursCategory.findAll({
      where: newObj,
      order: order,
      limit: limit,
      offset: offset,
      include: [{ model: Resurs }]
    });

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Error occurred", error: error.message });
  }
};

const getOneResursCategoriy = async (req, res) => {
  try {
    const { id } = req.params;
    const resurs = await resursCategory.findByPk(id, {
      include: [{ model: Resurs }]
    });
    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }
    res.status(200).json(resurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni olishda xatolik" });
  }
};

const updateResursCategoriy = async (req, res) => {
  try {
    let { error, value } = resursCategoryUpdate.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    await resursCategory.update(req.body, { where: { id: req.params.id } });
    res.send("Reurs muvaffaqiyatli yangilandi");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni yangilashda xatolik" });
  }
};

const deleteResursCategoriy = async (req, res) => {
  try {
    const { id } = req.params;
    await resursCategory.destroy(id);
    res.status(200).json({ message: "Resurs muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni o'chirishda xatolik" });
  }
};

export {
  createResursCategoriy,
  getAllResursCategoriy,
  getOneResursCategoriy,
  updateResursCategoriy,
  deleteResursCategoriy,
  findBySearchResursCategory,
};
