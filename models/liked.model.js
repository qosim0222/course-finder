import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";

let Liked = sequelize.define("liked", {
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
    oquvMarkazId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Oquvmarkaz,
            key: "id"
        }
    }
}, { timestamps: true })

User.hasMany(Liked, { foreignKey: "userId" });
Liked.belongsTo(User, { foreignKey: "userId" });

Oquvmarkaz.hasMany(Liked, { foreignKey: "oquvMarkazId" });
Liked.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

export default Liked