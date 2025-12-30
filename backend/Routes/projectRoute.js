import express from "express";
import { getproject, projects, updateProjectStatus, userviewproject, workerviewproject } from "../Controllers/projectController.js";

const projectdetail=express.Router()
projectdetail.post("/add",projects)
projectdetail.get("/allproject",getproject)
projectdetail.get("/userproject/:id",userviewproject)
projectdetail.get('/workerproject/:id',workerviewproject)
projectdetail.put("/status/:projectId", updateProjectStatus);

export default projectdetail