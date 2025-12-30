import mongoose, { Schema } from "mongoose";

const loginSchema=new Schema({
    
    userName:{
        type:String,
        required:true
    },
    passWord:{
        type:String,
        required:true,
    },
    role:{
        type:String,required:true,
    },
    verify:{
        type:Boolean,
        default:false,
    }
})
const loginData=mongoose.model("Login",loginSchema)
export default loginData