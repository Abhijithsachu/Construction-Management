import mongoose, { Schema } from "mongoose";

const bookingSchema=new Schema({
    
    userid:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    productid:{
    type:Schema.Types.ObjectId,
        ref:"Product",
    },
    workerbooking:{
        type:String,
        required:true,
    },
    productbooking:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
})
const bookingData=mongoose.model("Booking",bookingSchema)
export default bookingData