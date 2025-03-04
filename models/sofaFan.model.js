import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Yonalish from "./yonalish.model.js";

let Sohafan = sequelize.define(
  "sohafan",
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
    yonalishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Yonalish,
        key: "id",
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("soha", "fan"),
      allowNull: false,
    },
  },
  { timestamps: true }
);

Sohafan.belongsTo(Yonalish, { foreignKey: "yonalishId" })
Yonalish.hasMany(Sohafan, { foreignKey: "yonalishId" })

export default Sohafan;
