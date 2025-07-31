const JWT = require("jsonwebtoken");

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({
        Status: "500",
        Messege: "User not authorized, login again",
      });
    }

    const token_decode = JWT.verify(dtoken, process.env.JWT_SECRET);

    // Ensure req.body exists
    req.body = req.body || {};

    req.body.docId = token_decode.id;
    next();
  } catch (error) {
    res.status(400).json({
      Status: "400",
      Messege: "Some error in API",
      Error: error.message,
    });
  }
};

module.exports = { authDoctor };
