import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";
import User from "./user.model.js";

let Oquvmarkaz = sequelize.define("oquvmarkazs", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: "id"
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filialSoni: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Region,
            key: "id"
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

User.hasMany(Oquvmarkaz, { foreignKey: "userId" });
Oquvmarkaz.belongsTo(User, { foreignKey: "userId" });

Oquvmarkaz.belongsTo(Region, { foreignKey: "regionId" });
Region.hasMany(Oquvmarkaz, { foreignKey: "regionId" });

export default Oquvmarkaz