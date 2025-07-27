const uuid = require('uuid');

const { sequelize } = require('../../config/database_sequlize');
const knex = require('../../config/database_knex');

const InvoiceModel = require('../../models/invoices');
const UserModel = require('../../models/users/users');
const UserRoleModel = require('../../models/users/user_roles');

const invoiceService = {
    createInvoice: async (data) => {
      try {

        data.status = 0;
        data.secret_code = uuid.v4();
      
        const invoiceNo = await knex('master_values')
          .where('CATEGORY', 'INVOICE')
          .where('SUB_CATEGORY', 'NO')
          .first();
      
        data.invoice_no =
          'INV-COLLABORATOR' +
          new Date().getFullYear() +
          new Date().getMonth().toString().padStart(2, '0') +
          new Date().getDate().toString().padStart(2, '0') +
          invoiceNo.value.toString().padStart(4, '0');
      
        data.via = 'va';
        const invoice = await InvoiceModel.create(data);
      
        await knex('master_values')
          .where('CATEGORY', 'INVOICE')
          .where('SUB_CATEGORY', 'NO')
          .update({ value: parseInt(invoiceNo.value) + 1 });

        return invoice;
      } catch (error) {
        throw new Error('Failed to create invoice: ' + error.message);
      }
    },
    updateInvoice: async (options) => {
      const transaction = await sequelize.transaction();
      try {
        const data = await InvoiceModel.findOne({
          where: { secret_code: options.reference_id },
        });

        // Update data berdasarkan status_code
        if (parseInt(options.status_code) == 0) {
          Object.assign(data, {
            status: 1,
            sid: options.sid,
            via: options.via,
            channel: options.channel,
            potongan: options.fee,
            expired_at: options.expired_at,
            trx_id: options.trx_id,
          });
        } else if (parseInt(options.status_code) == 1) {
          Object.assign(data, {
            status: 4,
            sid: options.sid,
            via: options.via,
            channel: options.channel,
            potongan: options.fee,
            expired_at: options.expired_at,
            trx_id: options.trx_id,
          });

          const user = await UserModel.findByPk(data.user_id);

          if (user) {
            const userRole = new UserRoleModel();

            userRole.user_id = user.id;
            userRole.role_id = 2;

            await userRole.save({transaction});
          }
        } else if (parseInt(options.status_code) == -2) {
          data.status = 6;
        }

        await data.save({ transaction });
        await transaction.commit();

        return data;
      } catch (error) {
        await transaction.rollback();
        console.error("GAGAL MEMBUAT USER ROLE:", error); 
        throw new Error('Failed to update data: ' + error.message);
      }
    },
    updateSessionInvoice: async (data, user_id) => {
      const transaction = await sequelize.transaction();
      try {
        const result = await InvoiceModel.findByPk(data.id);
        result.sid = data.sid;
        result.via = data.via;
        result.user_id = user_id;
        result.channel = data.channel;
        result.payment_no = data.payment_no;
        result.payment_name = data.payment_name;
        result.potongan = data.fee;
        result.status = 1;
        result.virtual_account = data.payment_no;
        result.expired_at = data.expired_at;
        result.trx_id = data.trx_id;
        result.nominal_admin = 5000;

        await result.save({ transaction });

        await transaction.commit();
        return result;
      } catch (error) {
        await transaction.rollback();
        throw new Error('Failed to update session invoice: ' + error.message);
      }
    }
}


module.exports = invoiceService;