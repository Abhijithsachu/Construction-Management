import mongoose, { Schema } from "mongoose";

const feedbackSchema=new Schema({
    
    userid:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    feedbackbox:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    }
})
const feedbackData=mongoose.model("feedback",feedbackSchema)
export default feedbackData