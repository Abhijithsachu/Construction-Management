import express from "express";
import { venderregistration } from "../Controllers/venderController.js";
import upload from "../middleware/multer.js";

const vendorrouter = express.Router();

vendorrouter.post("/vndr_register", upload.single("image"), venderregistration);

export default vendorrouter;