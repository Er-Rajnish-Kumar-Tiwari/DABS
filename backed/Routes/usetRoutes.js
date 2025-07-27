const express=require("express");
const { registerUser, loginUser, getProfileData, updataProfile, bookAppointments, getAppointments } = require("../Controlls/userControll");
const { authUser } = require("../Middleware/authUser");
const upload = require("../Config/multer");
const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getProfileData",authUser,getProfileData);
userRouter.post("/updataProfile",upload.single("image"),authUser,updataProfile);
userRouter.post("/appointmentBook",authUser,bookAppointments);
userRouter.get("/listAppointments",authUser,getAppointments);

module.exports={userRouter};