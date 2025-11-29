import express from "express";

import { workerregistration } from "../Controllers/workerController.js";
import upload from "../middleware/multer.js";

const wrkrouter = express.Router();

wrkrouter.post("/wrk_register", upload.single("image"), workerregistration);

export default wrkrouter;
