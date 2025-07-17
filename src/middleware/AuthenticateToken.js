const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Token tidak ditemukan.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "fail",
        message: "Token tidak valid.",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
