const multer = require("multer");
const mime = require("mime-types");

const { createFolder } = require("../utils/CreateFolder");

/**
 * Factory function untuk membuat middleware upload Multer yang dapat dikonfigurasi.
 * @param {string} path - Path folder tujuan untuk menyimpan file. Contoh: './images/users/avatars/'
 * @param {string} fieldName - Nama dari field <input type="file"> di form HTML. Contoh: 'avatar'
 * @returns {Function} Middleware Multer yang siap digunakan di route Express.
 */
const createUploader = (path, fieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      createFolder(path);
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = mime.extension(file.mimetype);
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
  });

  const upload = multer({ storage: storage });

  return upload.single(fieldName);
};

module.exports = { createUploader };
