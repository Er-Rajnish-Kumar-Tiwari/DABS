const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { userModels } = require("../Models/userModel");
const { doctorModels } = require("../Models/doctorModel");
const { appointModels } = require("../Models/appointmentModel");
const cloudinary=require("cloudinary").v2;

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
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ Status: "400", Messege: "User ID missing in request." });
    }

    const userData = await userModels.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({ Status: "404", Messege: "User not found." });
    }

    res.status(200).json({ Status: "200", userData });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ Status: "500", Messege: "Server error", Error: error.message });
  }
};


const updataProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, dob, address, gender, phone } = req.body;
    const imageFile = req.file;

    // 1. Validate required fields
    if (!name || !dob || !address || !phone || !gender) {
      return res.status(400).json({
        Status: "400",
        Message: "Please fill all required fields.",
      });
    }

    // 2. Prepare update object
    const updateData = {
      name,
      dob,
      gender,
      phone,
    };

    // Parse address if it's a JSON string
    try {
      updateData.address = typeof address === "string" ? JSON.parse(address) : address;
    } catch (err) {
      return res.status(400).json({
        Status: "400",
        Message: "Invalid address format (must be JSON).",
      });
    }

    // 3. Upload image if provided
    if (imageFile) {
      const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "user_profiles", // optional: organize in folder
      });
      updateData.image = uploadedImage.secure_url;
    }

    // 4. Update user
    await userModels.findByIdAndUpdate(userId, updateData, { new: true });

    // 5. Send success response
    res.status(200).json({
      Status: "200",
      Messege: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({
      Status: "500",
      Messege: "Something went wrong while updating profile.",
      Error: error.message,
    });
  }
};

const bookAppointments=async(req,res)=>{

  try {
    const {docId,slotDate,slotTime}=req.body;
    const userId = req.userId;

    const docData=await doctorModels.findById(docId).select("-password");

    if(!docData.avaiable){
      res.json({Status:"500",Messege:"Doctor not avaiable"});
    }

    let slots_booked=docData.book_slot;
    
    // checking slot avaiable or not
    if(slots_booked[slotDate]){

      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({Status:"500",Messege:"Slot not avaiable"});
      }
      else {
        slots_booked[slotDate].push(slotTime);
      }

    }
    else {
      slots_booked[slotDate]=[];
      slots_booked[slotDate].push(slotTime);
    }

    const userData=await userModels.findById(userId).select("-password");
    delete docData.book_slot;

    const appointmentData={
      userId,
      docId,
      userData,
      docData,
      slotDate,
      slotTime,
      amount:docData.fees,
      date:Date.now()
    };

    const newAppointments=new appointModels(appointmentData);
    await newAppointments.save();

    await doctorModels.findByIdAndUpdate(docId,{book_slot: slots_booked});

    res.json({Status:"200", Message:"Appoinment Booked"});
    
  }
  catch (error) {
    console.log(error.message);
    res.json({Status:"404",Messege:error.message});  
  }

};


const getAppointments=async(req,res)=>{

  try {
    const userId=req.userId;
    const appointments=await appointModels.find({userId});
    res.json({Status:"200",appointments});
  }
  catch (error) {
    console.log(error.message);
    res.json({Status:"404",Messege:error.message});
  }

};

module.exports = { createToken, registerUser, loginUser, getProfileData , updataProfile,bookAppointments ,getAppointments};
