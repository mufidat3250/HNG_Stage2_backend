const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Organisation extends Model {}
Organisation.init(
  {
    orgId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      require: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: "organization" }
);

// {
// 	"orgId": "string", // Unique
// 	"name": "string", // Required and cannot be null
// 	"description": "string",
// }

module.exports = Organisation;
