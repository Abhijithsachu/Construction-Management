import express from "express";

import { getallWorkers, workerregistration } from "../Controllers/workerController.js";
import upload from "../middleware/multer.js";

const wrkrouter = express.Router();

wrkrouter.post("/wrk_register", upload.single("image"), workerregistration);
wrkrouter.get("/all",getallWorkers)
export default wrkrouter;
