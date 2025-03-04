import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

let resursCategory = sequelize.define(
  "resurscategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default resursCategory;
