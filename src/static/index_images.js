const express = require("express");

module.exports = function (app) {
  app.use("/image-users-foto", express.static("src/images/users/foto"));
  app.use("/image-contents", express.static("src/images/contents"));
};
