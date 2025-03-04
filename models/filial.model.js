import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";

let Filial = sequelize.define("filials", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    oquvMarkazId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Oquvmarkaz,
            key: "id"
        }
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Region,
            key: "id"
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { timestamps: true })

Filial.belongsTo(Region, { foreignKey: "regionId" })
Region.hasMany(Filial, { foreignKey: "regionId" })

Oquvmarkaz.hasMany(Filial, { foreignKey: "oquvMarkazId" });
Filial.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

export default Filial