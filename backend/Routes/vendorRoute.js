import express from "express";
import { shopHome, venderregistration } from "../Controllers/venderController.js";
import upload from "../middleware/multer.js";
import { addprdts } from "../Controllers/addprdtController.js";
import { BlockingVendors, viewVendor } from "../Controllers/adminController.js";

const vendorrouter = express.Router();

vendorrouter.post("/vndr_register", upload.single("image"), venderregistration);
vendorrouter.get("/details/:id",shopHome)
vendorrouter.get("/viewvendor",viewVendor)
vendorrouter.put("/vendorsstatus/:loginId",BlockingVendors)
export default vendorrouter;