import mongoose, { Schema } from "mongoose";

const productSchema=new Schema({
    productname:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    Quantity:{
        type:Number,
        required:true,
    },
    Photo:{
        type:String,
        required:true,
    },
    Vendorid:{
        type:Schema.Types.ObjectId,
        ref:"Vendor",
    },



})
const productData=mongoose.model("Product",productSchema)
export default productData