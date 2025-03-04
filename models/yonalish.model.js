import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";

let Yonalish = sequelize.define("yonalish", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oquvMarkazId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Oquvmarkaz,
            key: "id"
        }
    }
}, { timestamps: true })

Oquvmarkaz.hasMany(Yonalish, { foreignKey: "oquvMarkazId" });
Yonalish.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

export default Yonalish