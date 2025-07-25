// models/invoices/invoice.js
const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/database_sequlize"); // Sesuaikan path jika perlu

const Invoice = sequelize.define(
  "invoices",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    invoice_no: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nominal: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    nominal_admin: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    sid: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    via: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    channel: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    virtual_account: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expired_at: {
      type: DataTypes.DATE, // Sequelize akan menangani konversi antara Timestamp SQL dan Date JS
      allowNull: true,
    },
    secret_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trx_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    next_repeat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Kolom created_at dan updated_at akan ditangani secara otomatis oleh Sequelize
    // karena opsi timestamps di bawah diatur ke true.
  },
  {
    // Opsi untuk model
    freezeTableName: true, // Nama tabel tidak akan diubah menjadi bentuk jamak
    timestamps: true, // Mengaktifkan created_at dan updated_at
    underscored: true, // Menggunakan snake_case untuk kolom otomatis (created_at, updated_at)

    // Menentukan nama kolom secara eksplisit jika nama di database berbeda dari default Sequelize
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Invoice;
