import loginData from "../Models/login.js";
import projectData from "../Models/project.js";
import UserData from "../Models/User.js";
import VENDOR from "../Models/Venndor.js";

export const viewUser=async (req,res)=>{
    try{
        const user=await UserData.find().sort({createdAt:-1})
        if(!user){
            return res.status(400).json({message:"Cannot find User"})
        }
        // console.log(user);
         return res.status(200).json({user})

}
 catch(error){
        console.log(error)
        return res.status(500).json({message:"server side error"})
    }
}


export const viewVendor=async (req,res)=>{
    try{
        const vendor=await VENDOR.find().sort({createdAt:-1}).populate("commonkey")
        if(!vendor){
            return res.status(400).json({message:"Cannot find User"})
        }
        // console.log(user);
         return res.status(200).json({vendor})

}
 catch(error){
        console.log(error)
        return res.status(500).json({message:"server side error"})
    }
}

export const BlockingVendors = async (req, res) => {
  const { loginId } = req.params; // Login _id
  const { verify } = req.body; // true or false

  try {
    const login = await loginData.findById(loginId);
    if (!login) {
      return res.status(404).json({ message: "Login record not found" });
    }

    login.verify = verify;
    await login.save();

    return res.status(200).json({
      message: `Vendor has been ${verify ? "Unblocked" : "Blocked"}`,
      login,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server side error" });
  }
};

export const viewProject=async (req,res)=>{
    try{
        const project=await projectData.find().sort({createdAt:-1}).populate("workerID").populate("userid")
        if(!project){
            return res.status(400).json({message:"Cannot find Project"})
        }
        // console.log(user);
         return res.status(200).json({project})

}
 catch(error){
        console.log(error)
        return res.status(500).json({message:"server side error"})
    }
}