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
    ID:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true,
    },
    Logo:{
        type:String,
        required:true,
    }
})
const VendorData=mongoose.model("Vendor",VendorSchema)
export default VendorData