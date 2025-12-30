import mongoose, { Schema } from "mongoose";

const workerSchema=new Schema({
    name:{
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
 
    jobrole:{
        type:String,
        required:true,
    },
    photo:{
        type:String
    },
    qualification:{
        type:String,
        required:true,
    },  
     commonkey:{
       type:Schema.Types.ObjectId,

            ref:"Login",

    },
    
})
const WORKER=mongoose.model("Worker",workerSchema)
export default WORKER