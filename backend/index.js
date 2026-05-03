import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./Routes/userRoute.js"
import wrkrouter from "./Routes/workerRoute.js"
import vendorrouter from "./Routes/vendorRoute.js"
import authRouter from "./Routes/authRoute.js"
import productRoute from "./Routes/productRoute.js"
import bookingRoute from "./Routes/productbookingRoute.js"
import projectData from "./Models/project.js"
import projectdetail from "./Routes/projectRoute.js"
import complaintRoute from "./Routes/complaintRoute.js"

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongosedb connected successfully")
})
.catch((e)=>{
    console.log(e);
})

const app=express()
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use(cors({origin:"*"}))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


app.use("/api/user",userRoute)
app.use("/api/worker",wrkrouter)
app.use("/api/vendor",vendorrouter)
app.use("/api/login",authRouter)
app.use("/api/product",productRoute)
app.use("/api/productbooking",bookingRoute)
app.use("/api/viewproductbooking",bookingRoute)
app.use("/api/project",projectdetail)
app.use("/api/complaint",complaintRoute)

