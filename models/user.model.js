import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

let User = sequelize.define("user", {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("user", "seo", "admin"),
        allowNull: false
    }
}, { timestamps: true })

export default User