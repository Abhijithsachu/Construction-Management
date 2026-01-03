import loginData from "../Models/login.js"
import UserData from "../Models/User.js"
import bcrypt from"bcrypt"

export const userregistration=async(req,res)=>{
    console.log(req.body)
    const {name,email,phone,password}=req.body
    try {
        const existinguser=await loginData.findOne({userName:email})
        if(existinguser){
            return res.status(400).json({message:"user already exist"})
        }
        const hashpassword=await bcrypt.hash(password,10)
        const login=new loginData({
            userName:email,
            passWord:hashpassword,
  
            role:"User"

        })
        await login.save()
        const user=new UserData({
            name,phoneNo:phone,email,
            commonkey:login._id
        })
        await user.save() 
        return res.status(200).json({message:"registered successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server side error"})

    }
}

export const getUserHome=async(req,res)=>{
    const {id}=req.params
    console.log("11111111111111111111111111111111111111111111111111111111111",id);
    try{
        const user=await UserData.findOne({commonkey:id})
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