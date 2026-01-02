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
    Description:{
        type:String,
        required:true,
    },rating: {
    avgrating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    reviews: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
            review: { type: String },
            createdAt: { type: Date, default: Date.now },
        }
    ]
}




})
const productData=mongoose.model("Product",productSchema)
export default productData