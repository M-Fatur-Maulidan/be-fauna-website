const uuid = require('uuid');

const { sequelize } = require('../../config/database_sequlize');
const knex = require('../../config/database_knex');

const invoiceService = {
    createInvoice: async (data) => {
      const err = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,
      };
    
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
    
      if (invoice) {
        return invoice;
      } else {
        err.message = 'Failed to create kegiatan. Try again';
        throw new APIError(err);
      }
    }
}

module.exports = invoiceService;