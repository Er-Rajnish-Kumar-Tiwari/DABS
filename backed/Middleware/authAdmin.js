const JWT = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
        return res.json({ Status: "500", Messege: "User not authorized login again", Error: error });
    }

    const token_decode=JWT.verify(atoken,process.env.JWT_SECRET);

    if(token_decode!==process.env.Admin_Email + process.env.Admin_Password){
        return res.json({ Status: "500", Messege: "User not authorized login again", Error: error });
    }

    next();

  } catch (error) {
    res.json({ Status: "400", Messege: "Some error in API", Error: error });
  }
};

module.exports={authAdmin};
