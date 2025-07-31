const express=require("express");
const { addDoctor, allDoctor, adminLogin, changeAvailablity, allAppointments, canelAppointment, dashboardData, doctorLogin, getDoctorAppointments } = require("../Controlls/doctorControll");
const upload = require("../Config/multer");
const { authAdmin } = require("../Middleware/authAdmin");
const doctorRoute=express.Router();

doctorRoute.post("/addDoctor",authAdmin,upload.single("image"),addDoctor);
doctorRoute.post("/allDoctor",authAdmin,allDoctor);
doctorRoute.post("/availablity",authAdmin,changeAvailablity);
doctorRoute.get("/doctorList",allDoctor);
doctorRoute.post("/adminLogin",adminLogin);
doctorRoute.get("/allAppointments",authAdmin,allAppointments);
doctorRoute.post("/cancelByAdmin",authAdmin,canelAppointment);
doctorRoute.get("/dashboard",authAdmin,dashboardData);
doctorRoute.post("/drLogin",doctorLogin);
doctorRoute.get("/getDoctorAppointments",authDoctor,getDoctorAppointments);

module.exports=doctorRoute;