const validator = require("validator");
const bcrypt = require("bcryptjs");
const { doctorModels } = require("../Models/doctorModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { appointModels } = require("../Models/appointmentModel");
const { userModels } = require("../Models/userModel");
const { createToken } = require("./userControll");

// Password checking functions
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

// Add doctor with his all details
const addDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
  } = req.body;
  const fileName = req.file;

  try {
    // check all data filled or not
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ Status: "500", Messege: "Fills all data" });
    }

    // check email is vaild or not
    const vaildEmail = validator.isEmail(email);
    if (!vaildEmail) {
      return res.json({ Status: "500", Messsege: "Enter vaild email" });
    }

    // check password is vaild or not
    const vaildPass = isVaild(password);
    if (!vaildPass) {
      return res.json({ Status: "500", Messege: "Enter strong password" });
    }

    // generate secure password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // upload file on cloudinary
    const imageUpload = await cloudinary.uploader.upload(fileName.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // store final informations
    const newDoctorData = {
      name: name,
      email: email,
      password: hashedPass,
      image: imageUrl,
      degree: degree,
      speciality: speciality,
      experience: experience,
      address: JSON.parse(address),
      fees: fees,
      about: about,
      date: Date.now(),
    };

    // then create doctor account
    const newDoctor = new doctorModels(newDoctorData);
    await newDoctor.save();

    res.json({ Status: "200", Messege: "doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ Status: "400", Messege: "Some error", error: error });
  }
};

// View all the doctors list
const allDoctor = async (req, res) => {
  try {
    const alldoctors = await doctorModels.find().select("-password");
    res.json({ Status: "200", alldoctors });
  } catch (error) {
    res.json({ Status: "400", Messege: "Some error", error: error });
    console.log(error);
  }
};

// Login admin for add and delete doctor
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email === process.env.Admin_Email &&
      password === process.env.Admin_Password
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        Status: "200",
        Messege: "Admin Login Successfully",
        token: token,
      });
    } else {
      res.json({ Status: "500", Messege: "Wrong admin details" });
    }
  } catch (error) {
    res.json({ Status: "400", Messege: "Some error", error: error });
  }
};

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModels.findById(docId);
    await doctorModels.findByIdAndUpdate(docId, {
      avaiable: !docData.avaiable,
    });
    res.json({ Status: "200", Messege: "Availability changed" });
  } catch (error) {
    res.json({ Status: "400", Messege: "Some error", error: error });
  }
};

const allAppointments = async (req, res) => {
  try {
    const appointments = await appointModels.find();
    res.json({ Status: "200", appointments });
  } catch (error) {
    console.log(error.message);
    res.json({ Status: "400", Messege: "Some error", error: error });
  }
};

const canelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({ Status: "400", Messege: "appointmentId is required" });
    }

    const appointmentData = await appointModels.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ Status: "404", Messege: "Appointment not found" });
    }

    await appointModels.findByIdAndUpdate(appointmentId, { cancellled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModels.findById(docId);

    let book_slot = doctorData.book_slot;
    if (book_slot[slotDate]) {
      book_slot[slotDate] = book_slot[slotDate].filter((e) => e !== slotTime);
    }

    await doctorModels.findByIdAndUpdate(docId, { book_slot });

    res.json({ Status: "200", Messege: "Appointment Cancelled" });
  } catch (error) {
    console.log(error.message);
    res.json({
      Status: "500",
      Messege: "Internal Server Error",
      Error: error.message,
    });
  }
};

const dashboardData = async (req, res) => {

  try {
    const docData=await doctorModels.find();
    const userData=await userModels.find();
    const appData=await appointModels.find();

    const dashData={
        doctors:docData.length,
        users:userData.length,
        appointments:appData.length,
        latestAppointments:appData.reverse().slice(0,5)
    }

    res.json({Status:"200",dashData});
  } 
  catch (error) {
    console.log(error.message);
    res.json({
      Status: "500",
      Messege: "Internal Server Error",
      Error: error.message,
    });
  }

};

const doctorLogin=async(req,res)=>{

  try {
    const {email,password}=req.body;
    const doc=await doctorModels.findOne({email});

    if(!doc){
      return res.json({Status:"500",Messege:"Invaild details"});
    }

    const isMatch=await bcrypt.compare(password,doc.password);

    if(!isMatch){
      return res.json({Status:"500",Messege:"Wrong password"});
    }

    const dtoken=createToken(doc._id);

      res.json({
      Status: "200",
      Messege: "Doctor login successfully",
      dtoken:dtoken,
    });
  } 
  catch (error) {
    console.log(error.message);
    res.json({
      Status: "500",
      Messege: "Internal Server Error",
      Error: error.message,
    });
  }

};

const getDoctorAppointments = async (req, res) => {
  try {
    const docId = req.body.docId; //  access docId

    const appointments = await appointModels.find({ docId });

    if (appointments.length === 0) {
      return res.json({ Status: "404", Messege: "No appointments found" ,docId: docId});
    }

    res.json({ Status: "200", appointments });
  } catch (error) {
    console.log(error.message);
    res.json({
      Status: "500",
      Messege: "Internal Server Error",
      Error: error.message,
    });
  }
};

const appointmentCompleted=async(req,res)=>{

  try {
    const {appointmentId}=req.body;
    const docId = req.body.docId;

    const appointmentData = await appointModels.findById(appointmentId);

    if(appointmentData && appointmentData.docId === docId) {
      await appointModels.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ Status: "200", Messege: "Appointment marked as completed" });
    }
    else {
      return res.json({ Status: "404", Messege: "Appointment not found or does not belong to this doctor" });
    }
  } 
  catch (error) {
    console.log(error.message);
    res.json({
      Status: "500",
      Messege: "Internal Server Error",
      Error: error.message,
    }); 
  }

}

const doctorDashboard=async(req,res)=>{

  try {
    const docId = req.body.docId;
    const appointments=await appointModels.findById({docId});
    let earnings=0;

    appointments.map(item=>{
      if(item.isCompleted || item.payment){
        earnings+=item.amount;
      }
    });

    let patients=[];

    appointments.map(item=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId);
      }
    });

    const dashData={
      earnings,
      appointments:appointments.length,
      patients:patients.length,
        latestAppointments:appointments.reverse().slice(0,5)
    }

    res.json({Status:"200",dashData});
    
  } 
  catch (error) {
    console.log(error.message);
    res.json({
      Status: "500",
      Messege: "Internal Server Error",
      Error: error.message,
    }); 
  }

}

module.exports = {
  addDoctor,
  allDoctor,
  adminLogin,
  changeAvailablity,
  allAppointments,
  canelAppointment,
  dashboardData,
  doctorLogin,
  getDoctorAppointments,
  appointmentCompleted,
  doctorDashboard
};
