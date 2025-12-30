import express from "express"
import { getUserHome, userregistration } from "../Controllers/userController.js"

const router=express.Router()
router.post("/register",userregistration)
router.get("/details/:id",getUserHome)

export default router