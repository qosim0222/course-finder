import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Yonalish from "./yonalish.model.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";

let Yozilish = sequelize.define("yozilish", {
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
    yonalishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Yonalish,
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
    },
}, { timestamps: true })

Yonalish.hasMany(Yozilish, { foreignKey: "yonalishId" });
Yozilish.belongsTo(Yonalish, { foreignKey: "yonalishId" });

User.hasMany(Yozilish, { foreignKey: "userId" });
Yozilish.belongsTo(User, { foreignKey: "userId" });

Yozilish.belongsTo(Oquvmarkaz, { foreignKey: "userId" });
Oquvmarkaz.hasMany(Yozilish, { foreignKey: "userId" });

export default Yozilish