import express from "express";
import { getAcceptedProjectsForWorker, getproject, projects, updateProjectStatus, userviewproject, workerviewproject } from "../Controllers/projectController.js";
import { viewProject } from "../Controllers/adminController.js";

const projectdetail=express.Router()
projectdetail.post("/add",projects)
projectdetail.get("/allproject",getproject)
projectdetail.get("/userproject/:id",userviewproject)
projectdetail.get('/workerproject/:id',workerviewproject)
projectdetail.put("/status/:projectId", updateProjectStatus);
projectdetail.get("/adminviewproject",viewProject)
projectdetail.get("/acceptedproject/:id",getAcceptedProjectsForWorker)

export default projectdetail