const mongoose=require("mongoose");

const appointmentSchema=new mongoose.Schema({
    userId :{type:String,required:true},
    docId :{type:String,required:true},
    slotDate :{type:String,required:true},
    slotTime :{type:String,required:true},
    userData :{type:Object,required:true},
    docData :{type:Object,required:true},
    amount :{type:Number,required:true},
    date :{type:Number,required:true},
    payment :{type:Boolean,default:false},
    cancellled :{type:Boolean,default:false},
    isCompleted :{type:Boolean,default:false},
});

const appointModels=mongoose.models.appointments || mongoose.model("appointments",appointmentSchema);
module.exports={appointModels,appointmentSchema};