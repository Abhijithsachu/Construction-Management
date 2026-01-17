import express from "express"
import {getUserHome, userregistration } from "../Controllers/userController.js"
import { viewUser } from "../Controllers/adminController.js"

const router=express.Router()
router.post("/register",userregistration)
router.get("/details/:id",getUserHome)
router.get("/viewUser",viewUser)

export default router