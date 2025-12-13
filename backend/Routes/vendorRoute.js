import express from "express";
import { staffdetails, venderregistration } from "../Controllers/venderController.js";
import upload from "../middleware/multer.js";
import { addprdts } from "../Controllers/addprdtController.js";

const vendorrouter = express.Router();

vendorrouter.post("/vndr_register", upload.single("image"), venderregistration);
vendorrouter.get("/details/:id",staffdetails)
vendorrouter.post("/products",upload.single("photo"), addprdts)

export default vendorrouter;