import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },

    commonkey:{
       type:Schema.Types.ObjectId,

    ref:"login"
    },
    phoneNo:{
        type:String,
        required:true,
    }

    
})
const UserData=mongoose.model("User",UserSchema)
export default UserData