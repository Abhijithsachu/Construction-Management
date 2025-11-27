import express from "express"
import { userregistration } from "../Controllers/userController.js"

const router=express.Router()
router.post("/register",userregistration)
export default router