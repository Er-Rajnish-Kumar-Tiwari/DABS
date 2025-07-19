const JWT = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const {token} = req.headers;

    if (!token) {
      return res.status(401).json({
        Status: "401",
        Message: "User not authorized. Login again.",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(403).json({
      Status: "403",
      Message: "Invalid or expired token.",
      Error: error.message,
    });
  }
};

module.exports = { authUser };
