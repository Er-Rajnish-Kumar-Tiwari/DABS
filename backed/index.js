// this is called packages 
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dbConnnection = require("./Config/db");
const cloudinaryConnection = require("./Config/cloudinary");
const { userRouter } = require("./Routes/usetRoutes");
const doctorRoute = require("./Routes/doctorRoutes");
require("dotenv").config();


// this is called configration file  and middleware 
const app=express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173/", "https://doctor-booking-system-jdde.onrender.com/"], // update this
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // only if you're using cookies
}));


dbConnnection();
cloudinaryConnection();
app.use(userRouter);
app.use(doctorRoute);


// This is called endpoints.example of endpoints , http://localhost:2000/
app.post("/",(req,res)=>{
    const {fullName}=req.body;
    res.send({Massage:"Api working",fullName});
    console.log("Api working ",fullName);
});


// this server running on given port
app.listen(process.env.PORT);