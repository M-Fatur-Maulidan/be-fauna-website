const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database_sequlize");

const User = require("../users/users");
const Role = require("../users/roles");

const UserRoles = sequelize.define(
  "user_roles",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = UserRoles;
