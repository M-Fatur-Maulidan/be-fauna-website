const Sequelize = require("sequelize");

const { sequelize } = require("../../config/database_sequlize");

const { DataTypes } = Sequelize;

const UserRoles = sequelize.define(
  "user_roles",
  {
    user_id: {
      // Diubah dari penggunaId
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    role_id: {
      // Diubah dari peranId
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
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
