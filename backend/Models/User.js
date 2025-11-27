import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    ID:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true,
    }

    
})
const UserData=mongoose.model("User",UserSchema)
export default UserData