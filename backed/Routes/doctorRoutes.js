const express=require("express");
const { addDoctor, allDoctor, adminLogin, changeAvailablity, allAppointments, canelAppointment, dashboardData, doctorLogin, getDoctorAppointments, appointmentCompleted, doctorDashboard, cancelDrAppointment, getDrProfileData, updateDrProfile } = require("../Controlls/doctorControll");
const upload = require("../Config/multer");
const { authAdmin } = require("../Middleware/authAdmin");
const { authDoctor } = require("../Middleware/authDoctor");
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
doctorRoute.get("/getDoctorAppointment",authDoctor,getDoctorAppointments);
doctorRoute.post("/cancelByDoctor",authDoctor,cancelDrAppointment);
doctorRoute.post("/appointmentCompleted",authDoctor,appointmentCompleted);
doctorRoute.get("/drDashboard",authDoctor,doctorDashboard);
doctorRoute.get("/drProfile",authDoctor,getDrProfileData);
doctorRoute.post("/updateProfile",authDoctor,updateDrProfile)

module.exports=doctorRoute;