const JWT = require("jsonwebtoken");

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
        return res.json({ Status: "500", Messege: "User not authorized login again", Error: error });
    }

    const token_decode=JWT.verify(dtoken,process.env.JWT_SECRET);
    req.body.docId=token_decode.id;
    next();

  } catch (error) {
    res.json({ Status: "400", Messege: "Some error in API", Error: error });
  }
};

module.exports={authDoctor};
