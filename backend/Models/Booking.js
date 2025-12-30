import mongoose, { Schema } from "mongoose";

const bookingSchema=new Schema({
    
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    productId:{
    type:Schema.Types.ObjectId,
        ref:"Product",
    },
    quantity:{
        type:Number,
        required:true,
    },
    totalamount:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
})
const bookingData=mongoose.model("Booking",bookingSchema)
export default bookingData