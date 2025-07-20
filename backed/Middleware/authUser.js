const JWT = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        Status: "401",
        Message: "User not authorized. Login again.",
      });
    }

    const token = authHeader.split(" ")[1];
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
