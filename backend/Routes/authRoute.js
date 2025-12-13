import express from "express"
import { loginUser } from "../Controllers/authController.js"

const router=express.Router()
router.post("/",loginUser)
export default router