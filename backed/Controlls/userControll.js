const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { userModels } = require("../Models/userModel");

const isVaild = (pass) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  const isValid =
    validator.isLength(pass, { min: minLength }) &&
    hasNumber.test(pass) &&
    hasUpperCase.test(pass) &&
    hasLowerCase.test(pass) &&
    hasSpecialChar.test(pass);

  return isValid;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exits = await userModels.findOne({ email });
    if (exits) {
      return res.json({ Status: "500", Messege: "User already exits" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ Status: "500", Messege: "please enter vaild email" });
    }

    const vaildPass = isVaild(password);
    if (!vaildPass) {
      return res.json({ Status: "500", Messege: "enter strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new userModels({
      name: name,
      email: email,
      password: hashPass,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      Status: "200",
      Messege: "User register successfully",
      token: token,
    });
  } catch (error) {
    res.json({ Status: "400", Messege: "Some error", error: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.json({
        Status: "500",
        Messege: "User not exits please register",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        Status: "500",
        Messege: "Invaild password please try agaib latter",
      });
    }

    const token = createToken(user._id);

    res.json({ Status: "200", Messege: "Login successfully", token: token });
  } catch (error) {
    res.json({ Status: "400", Messege: "Some error", error: error });
  }
};

const getProfileData = async (req, res) => {
  try {
    const  userId  = req.userId;

    const userData = await userModels.findById(userId).select("-password");
    res.json({ Status: "200", userData });
  } catch (error) {
    console.log(error.message);
    res.json({ Status: "400", Messege: "Some error", error: error });
  }
};

module.exports = { createToken, registerUser, loginUser, getProfileData };
