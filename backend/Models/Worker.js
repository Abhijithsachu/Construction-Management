import mongoose, { Schema } from "mongoose";

const workerSchema=new Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    ID:{
        type:String,
        required:true
    },
    jobrole:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    }
    
})
const wrokerData=mongoose.model("Worker",workerSchema)
export default workerData