import mongoose, { Schema } from "mongoose";

const complaintSchema=new Schema({
    
    userid:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    textbox:{
        type:String,
        required:true,
    },
    reply:{
        type:String,
        required:true,
    },
    
})
const complaintData=mongoose.model("complaint",complaintSchema)
export default complaintData