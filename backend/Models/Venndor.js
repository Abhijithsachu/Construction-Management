import mongoose, { Schema } from "mongoose";

const vendorSchema=new Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    Location:{
        type:String,
        required:true,
    },
    CompanyLogo:{
        type:String,
        // required:true,
    },
    commonkey:{
        type:Schema.Types.ObjectId,
        ref:"Login",
        required:true
    }
})
const VENDOR=mongoose.model("Vendor",vendorSchema)
export default VENDOR