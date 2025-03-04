import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";

let Comment = sequelize.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    msg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    star: {
        type: DataTypes.INTEGER,
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

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Oquvmarkaz.hasMany(Comment, { foreignKey: "oquvMarkazId" });
Comment.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

export default Comment