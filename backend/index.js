import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import userRoute from "./Routes/userRoute.js"
import wrkrouter from "./Routes/workerRoute.js"
import vendorrouter from "./Routes/vendorRoute.js"
import authRouter from "./Routes/authRoute.js"
import productRoute from "./Routes/productRoute.js"
import bookingRoute from "./Routes/productbookingRoute.js"
import projectData from "./Models/project.js"
import projectdetail from "./Routes/projectRoute.js"

mongoose.connect("mongodb://localhost:27017/Construction").then(()=>{
    console.log("mongosedb connected successfully")
})
.catch((e)=>{
    consol.log(e);
})

const app=express()
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use(cors({origin:"*"}))
app.listen(8000,()=>{console.log("ServerStarted on port 8000")})
app.use("/api/user",userRoute)
app.use("/api/worker",wrkrouter)
app.use("/api/vendor",vendorrouter)
app.use("/api/login",authRouter)
app.use("/api/product",productRoute)
app.use("/api/productbooking",bookingRoute)
app.use("/api/viewproductbooking",bookingRoute)
app.use("/api/project",projectdetail)
app.use("/api/projects",projectdetail)