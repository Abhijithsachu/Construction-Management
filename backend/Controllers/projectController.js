import projectData from "../Models/project.js";
import UserData from "../Models/User.js";
import WORKER from "../Models/Worker.js";

export const projects=async (req,res)=>{
    // const{}
    console.log(req.body);
    const{userId,projectName,workers,location,description,startDate}=req.body
    try{
        const projectdetails= new projectData({
            userid:userId,
            projectname:projectName,
            workerID:workers,
            location,
            description,
            date:startDate
        })
        await projectdetails.save()
        return res.status(200).json({message:"Saved Succesfully"})
    }
    catch(e){
        console.log(e)
              return res.status(500).json({message:"server side error"})
    }
}

export const getproject=async(req,res)=>{

    try{
        const projectdatas=await projectData.find()
     return res.status(200).json({projectdatas});
    }
    catch(e){
        console.log(e)
              return res.status(500).json({message:"server side error"})
    }
}
export const userviewproject=async(req,res)=>{
    const{id}=req.params
    console.log(id);
    
    try{
        const user = await UserData.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
        const viewproject=await projectData.find({userid:id})
        return res.status(200).json({data:viewproject})
    }
    catch(e){
        console.log(e)
              return res.status(500).json({message:"server side error"})
    }
}


export const workerviewproject=async(req,res)=>{
    const{id}=req.params
    console.log(id);
    
    try{
        const worker = await WORKER.findById(id);
    if (!worker) {
      return res.status(404).json({ message: "worker not found" });
    }
        const viewproject=await projectData.find({workerID:id})
        console.log(viewproject);
        
        return res.status(200).json({data:viewproject})
    }
    catch(e){
        console.log(e)
              return res.status(500).json({message:"server side error"})
    }
}

// worker accept / reject project
export const updateProjectStatus = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body; // accepted | rejected

  try {
    const project = await projectData.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = status;
    await project.save();

    return res.status(200).json({
      message: `Project ${status} successfully`,
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getAcceptedProjectsForWorker = async (req, res) => {
  const { id } = req.params; // worker ID
console.log(id);

  try {
    const worker = await WORKER.findById(id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Fetch projects assigned to the worker with status 'accepted'
    const acceptedProjects = await projectData.find({
      workerID: id,
      status: "accepted",
    });

    return res.status(200).json({ data: acceptedProjects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const addstaff = async (req, res) => {
  try {
    const { projectId, workers } = req.body; // workers = staff list

    if (!projectId || !workers || !workers.length) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const project = await projectData.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔒 Ensure project is accepted
    if (project.status !== "accepted") {
      return res
        .status(403)
        .json({ message: "Project not accepted yet" });
    }

    // 🔹 Validate staff data
    for (let staff of workers) {
      if (!staff.name || !staff.phone) {
        return res
          .status(400)
          .json({ message: "Staff name and phone required" });
      }
    }

    // 🔹 Add staff under main worker
    project.staff.push(...workers) ; // overwrite OR use push if needed
    await project.save();

    return res.status(200).json({
      message: "Staff added successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};




