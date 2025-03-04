import { DataTypes, STRING } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import resursCategory from "./resursCategory.model.js";

let Resurs = sequelize.define(
  "resurs",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resursCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: resursCategory,
        key: "id"
      }
    }
  },
  { timestamps: true }
);

User.hasMany(Resurs, { foreignKey: "userId" });
Resurs.belongsTo(User, { foreignKey: "userId" });

Resurs.belongsTo(resursCategory, { foreignKey: "resursCategoryId" })
resursCategory.hasMany(Resurs, { foreignKey: "resursCategoryId" })

export default Resurs;