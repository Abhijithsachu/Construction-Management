import express from "express";
import { shopHome, venderregistration } from "../Controllers/venderController.js";
import upload from "../middleware/multer.js";
import { addprdts } from "../Controllers/addprdtController.js";

const vendorrouter = express.Router();

vendorrouter.post("/vndr_register", upload.single("image"), venderregistration);
vendorrouter.get("/details/:id",shopHome)

export default vendorrouter;