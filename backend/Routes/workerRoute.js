import express from "express";
import {
  getallWorkers,
  getVerifiedWorkers,
  getWorkerDashboardCounts,
  getWorkerHome,
  updateWorkerStatus,
  workerregistration
} from "../Controllers/workerController.js";

import upload from "../middleware/multer.js";
import { addstaff } from "../Controllers/projectController.js";

const wrkrouter = express.Router();

wrkrouter.post(
  "/wrk_register",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "proof", maxCount: 1 }
  ]),
  workerregistration
);

wrkrouter.get("/all", getallWorkers);
wrkrouter.put("/updatestatus/:loginId", updateWorkerStatus);
wrkrouter.get("/verifiedworker", getVerifiedWorkers);
wrkrouter.get("/details/:id", getWorkerHome);
wrkrouter.post("/addstaff", addstaff);
wrkrouter.get("/workercount/:workerId", getWorkerDashboardCounts);

export default wrkrouter;