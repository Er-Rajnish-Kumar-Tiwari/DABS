const express=require("express");
const { addDoctor, removeDoctor, allDoctor, adminLogin } = require("../Controlls/doctorControll");
const upload = require("../Config/multer");
const doctorRoute=express.Router();

doctorRoute.post("/addDoctor",upload.single("image"),addDoctor);
doctorRoute.delete("/removeDoctor",removeDoctor);
doctorRoute.get("allDoctor",allDoctor);
doctorRoute.post("/adminLogin",adminLogin);

module.exports=doctorRoute;