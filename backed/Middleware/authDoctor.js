const JWT = require("jsonwebtoken");

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({
        status: "401",
        message: "User not authorized, please login again.",
      });
    }

    const decoded = JWT.verify(dtoken, process.env.JWT_SECRET);

    req.doctor = { id: decoded.id }; //  store docId in req.doctor
    next();

  } catch (error) {
    return res.status(400).json({
      status: "400",
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
};
