const express = require("express");

const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');

const invoiceService = require('../../services/web/web_invoice_services');

const createInvoice = async (req, res, next) => {
    try {
      req.body.nominal = 10000;
      req.body.channel = req.body.payment_method;
      req.body.user_id = req.auth.sub;

      const data = await invoiceService.createInvoice(req.body, cart);

      const apikey = process.env.API_KEY_IPAYMU;
      const va = process.env.VA_IPAYMU;
      const url = process.env.URL_DIRECT_PAYMENT_IPAYMU;

      let nama = '';
      let phone = '';
      let email = '';

      if (req.body.nama) {
        nama = req.body.nama.trim();
      }

      if (req.body.whatsapp) {
        phone = req.body.whatsapp.trim();
      }

      if (req.body.email) {
        email = req.body.email.trim();
      }

      const body = {
        name: nama,
        phone,
        email,
        amount: total + 5000,
        notifyUrl: `${process.env.APP_URL}/api/v1/web/invoice/payment/notify`, // your callback url
        referenceId: data.secret_code, // your reference id or transaction id
        paymentMethod: 'va',
        paymentChannel: req.body.payment_method,
        expired: '1',
        expiredType: 'hours',
      };

      // generate signature
      const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
      const stringtosign = 'POST:' + va + ':' + bodyEncrypt + ':' + apikey;
      const signature = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(stringtosign, apikey)
      );

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          va,
          signature,
          timestamp: moment().unix(),
        },
        body: JSON.stringify(body),
      });

      const respBody = await response.json();

      if (respBody && respBody.Status == 200) {
        await invoiceService.updateSessionInvoice(
          {
            id: data.id,
            sid: respBody.Data.SessionId,
            via: respBody.Data.Via,
            channel: respBody.Data.Channel,
            payment_no: respBody.Data.PaymentNo,
            payment_name: respBody.Data.PaymentName,
            fee: respBody.Data.Fee,
            expired_at: respBody.Data.Expired,
            trx_id: respBody.Data.TransactionId,
            user_id: data.user_id,
          },
          req.auth.sub
        );

        respBody.url_payment =
          process.env.URL_PAYMENT_IPAYMU + respBody.Data.SessionId;
      } else {
        return res.status(422).json({
          message:
            'Service tersebut saat ini tidak tersedia, silahkan menggunakan bank lain',
        });
      }

      if (respBody.Data.PaymentName == body.name) {
        respBody.Data.PaymentName = '';
      }

      return res.json({
        message: 'Invoice Successfully Added',
        data: {
          id: data.id,
          nominal: data.nominal,
          status: data.status,
          channel: data.channel,
          invoice_no: data.invoice_no,
        },
        total_harga: body.amount,
        response: {
          Data: {
            Channel: respBody.Data.Channel,
            Expired: respBody.Data.Expired,
            PaymentName: respBody.Data.PaymentName,
            PaymentNo: respBody.Data.PaymentNo,
          },
          url_payment: respBody.url_payment,
        },
      });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
}

const paymentNotify = async (req, res, next) => {
    try {
        req.body.original_data = JSON.stringify(req.body);

        invoice = await invoiceService.updateInvoice(req.body);

        return res.json({ message: 'Payment notification received' });
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

module.exports = {
    createInvoice,
    paymentNotify
};