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
    
})
const projectData=mongoose.model("project",loginSchema)
export default projectData