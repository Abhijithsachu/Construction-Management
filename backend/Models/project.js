import mongoose, { Schema } from "mongoose";

const projectSchema=new Schema({
    
    userid:{
       type:Schema.Types.ObjectId,
       ref:"User",
    },
    projectname:{ 
    type:String,
        required:true,
    },
    workerID:{
       type:Schema.Types.ObjectId,
       ref:"Worker",
    },
    location:{ 
    type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'pending'
    }
    
})
const projectData=mongoose.model("project",projectSchema)
export default projectData