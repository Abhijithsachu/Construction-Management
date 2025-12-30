import express from "express";

import { getallWorkers, updateWorkerStatus, workerregistration } from "../Controllers/workerController.js";
import upload from "../middleware/multer.js";

const wrkrouter = express.Router();

wrkrouter.post("/wrk_register", upload.single("image"), workerregistration);
wrkrouter.get("/all",getallWorkers)
wrkrouter.put("/updatestatus/:loginId", updateWorkerStatus);

export default wrkrouter;
