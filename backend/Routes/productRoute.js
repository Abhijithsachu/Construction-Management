import express from "express"
import upload from "../middleware/multer.js"
import { addprdts, getProductByShop } from "../Controllers/addprdtController.js"
const router=express.Router()
router.post("/",upload.single("photo"), addprdts)
router.get('/vendor/:VenderId',getProductByShop)
export default router
