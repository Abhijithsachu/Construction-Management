import loginData from "../Models/login.js"
import VENDOR from "../Models/Venndor.js"
import bcrypt from"bcrypt"

export const venderregistration=async(req,res)=>{
    console.log(req.body)
    const{CompanyName,email,phoneNo,Location,password}=req.body
    try{
        const existinguser=await loginData.findOne({userName:email})
        if(existinguser){
            return res.status(400).json({message:"User Already exist"})
        }
        const hashpassword=await bcrypt.hash(password,10)
        const login=new loginData({
            userName:email,
            passWord:hashpassword,
            role:"Vendor"
        })
        await login.save()
        const vendor=new VENDOR({
            Name:CompanyName,email,phoneNo,Location,
            CompanyLogo  :req.file ? req.file.path : null,
            password,
            commonkey:login._id
        })
        await vendor.save() 
        return res.status(200).json({message:"registered successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server side error"})
    }
}

export const staffdetails=async(req,res)=>{
    const {id}=req.params
    console.log(id);
    try{
        const shop=await VENDOR.findOne({commonkey:id})
        if(!shop){
            return res.status(400).json({message:"Cannot find User"})
        }
        // console.log(shop);
         return res.status(200).json({shop})

        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"server side error"})
    }

    
}