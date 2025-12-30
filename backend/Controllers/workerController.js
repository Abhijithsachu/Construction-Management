import loginData from "../Models/login.js";
import bcrypt from "bcrypt";
import WORKER from "../Models/Worker.js";

export const workerregistration = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { fullname, email, phone, qualification, jobrole, password } = req.body;

    // check existing user
    const existinguser = await loginData.findOne({ userName: email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // create login record
    const login = new loginData({
      userName: email,
      passWord: hashpassword,
      role: "Worker"
    });
    await login.save();

    // create worker profile
    const worker = new WORKER({
      name: fullname,
      email,
      phoneNo: phone,
      jobrole,
      qualification,
      photo: req.file ? req.file.path : null, // <--- store image path
      commonkey: login._id
    });

    await worker.save();

    return res.status(200).json({ message: "Registered successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server side Error" });
  }
};
export const getallWorkers= async(req, res)=>{
  try{
    const workerDetails=await WORKER.find().populate('commonkey')
    // console.log(workerDetails);
    
    return res.status(200).json({workerDetails});
  }
  catch (error){
    console.log(error)
    return res.status(500).json({ message:"Server Side Error"});
  }
}
export const updateWorkerStatus = async (req, res) => {
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
      message: `Worker has been ${verify ? "approved" : "rejected"}`,
      login,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server side error" });
  }
};



export const getVerifiedWorkers = async (req, res) => {
  try {
    const verifiedWorkers = await WORKER.find()
      .populate({
        path: "commonkey",
        match: { verify: true }, // ✅ only verified logins
        select: "verify",
      });

    // populate match null aavunnav filter cheyyanam
    const filteredWorkers = verifiedWorkers.filter(
      (worker) => worker.commonkey !== null
    );

    return res.status(200).json(filteredWorkers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server side error" });
  }
};

export const getWorkerHome=async(req,res)=>{
    const {id}=req.params
    console.log(id);
    try{
        const user=await WORKER.findOne({commonkey:id})
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