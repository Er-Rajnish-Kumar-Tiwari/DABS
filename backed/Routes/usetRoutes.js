const express=require("express");
const { registerUser, loginUser, getProfileData } = require("../Controlls/userControll");
const { authUser } = require("../Middleware/authUser");
const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getProfileData",authUser,getProfileData);

module.exports={userRouter};