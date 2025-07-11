const mongoose=require("mongoose");

const doctorSchema=new mongoose.Schema({
    
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    speciality:{type:String,required:true},
    image:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    fees:{type:Number,required:true},
    address:{type:Object,required:true},
    book_slot:{type:Object,default:{}},
    avaiable:{type:Boolean,default:true},
    date:{type:Number,required:true},

},{minimize:false});

const doctorModels=mongoose.models.doctor || mongoose.model("doctor",doctorSchema);
module.exports={doctorModels,doctorSchema};