import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

let Region = sequelize.define("regions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

export default Region