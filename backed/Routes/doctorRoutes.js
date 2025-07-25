const express=require("express");
const { addDoctor, removeDoctor, allDoctor, adminLogin, changeAvailablity } = require("../Controlls/doctorControll");
const upload = require("../Config/multer");
const { authAdmin } = require("../Middleware/authAdmin");
const doctorRoute=express.Router();

doctorRoute.post("/addDoctor",authAdmin,upload.single("image"),addDoctor);
doctorRoute.delete("/removeDoctor",authAdmin,removeDoctor);
doctorRoute.post("/allDoctor",authAdmin,allDoctor);
doctorRoute.post("/availablity",authAdmin,changeAvailablity);
doctorRoute.get("/doctorList",allDoctor);
doctorRoute.post("/adminLogin",adminLogin);

module.exports=doctorRoute;