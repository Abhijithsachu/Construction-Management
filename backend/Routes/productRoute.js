import express from "express"
import upload from "../middleware/multer.js"
import { addprdts, allproducts, deleteProduct, getproductById, getProductByShop, updateProductById } from "../Controllers/addprdtController.js"
const router=express.Router()

router.get("/allproduct",allproducts)

router.post("/",upload.single("photo"), addprdts)
router.get('/vendor/:VenderId',getProductByShop)
router.get("/:productId",getproductById)
router.put("/update/:productId", upload.single("photo"), updateProductById);
router.delete("/vendor/delete/:id",deleteProduct)


export default router
