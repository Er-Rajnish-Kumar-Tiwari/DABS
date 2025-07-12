const validator=require("validator");
const bcrypt=require("bcrypt");
const { doctorModels } = require("../Models/doctorModel");
const cloudinary=require("cloudinary").v2;
const jwt=require("jsonwebtoken");

// Password checking functions
const isVaild = (pass) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  const isValid = validator.isLength(pass, { min: minLength }) &&
    hasNumber.test(pass) &&
    hasUpperCase.test(pass) &&
    hasLowerCase.test(pass) &&
    hasSpecialChar.test(pass);

  return isValid;
};


// Add doctor with his all details
const addDoctor=async(req,res)=>{

    const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
    const fileName=req.file;

    try {
        
        // check all data filled or not 
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({Status:"500",Messege:"Fills all data"});
        }

        // check email is vaild or not 
        const vaildEmail=validator.isEmail(email);
        if(!vaildEmail){
            return res.json({Status:"500",Messsege:"Enter vaild email"});
        }

        // check password is vaild or not 
        const vaildPass=isVaild(password);
        if(!vaildPass){
            return res.json({Status:"500", Messege:"Enter strong password"});
        }

        // generate secure password 
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt);

        // upload file on cloudinary
        const imageUpload=await cloudinary.uploader.upload(fileName.path,{resource_type:"image"});
        const imageUrl=imageUpload.secure_url;

        // store final informations 
        const newDoctorData={
            name:name,
            email:email,
            password:hashedPass,
            image:imageUrl,
            degree:degree,
            speciality:speciality,
            experience:experience,
            address:JSON.parse(address),
            fees:fees,
            about:about,
            date:Date.now()
        };

        // then create doctor account
        const newDoctor=new doctorModels(newDoctorData);
        await newDoctor.save();

        res.json({Status:"200",Messege:"doctor added successfully",})
    }

    catch (error) {
        console.log(error);
        res.json({Status:"400",Messege:"Some error",error:error});
    }

};


// Remove doctor with his all details
const removeDoctor=async(req,res)=>{

    try {
        
    }

    catch (error) {
        res.json({Status:"400",Messege:"Some error",error:error});
    }

};


// View all the doctors list 
const allDoctor=async(req,res)=>{

    try {
        
    }

    catch (error) {
        res.json({Status:"400",Messege:"Some error",error:error});
    }

};

// Login admin for add and delete doctor
const adminLogin=async(req,res)=>{
    const {email,password}=req.body;

    try {

        if(email===process.env.Admin_Email && password===process.env.Admin_Password){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({Status:"200",Messege:"Admin Login Successfully",token:token});
        }
        else{
            res.json({Status:"500",Messege:"Wrong admin details"});
        }
        
    }

    catch (error) {
        res.json({Status:"400",Messege:"Some error",error:error});
    }

};

module.exports={addDoctor,removeDoctor,allDoctor,adminLogin};