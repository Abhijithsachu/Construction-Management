import productData from "../Models/product.js";

export const addprdts = async (req,res) => {
    console.log(req.body);
    console.log(req.file.path || req.file );
    
    const {name,price,quantity,description,shopId}=req.body
    const image=req.file.path

    try {
        const existingprd=await productData.findOne({productname:name})
        if(existingprd){
            return res.status(400).json({message:"Product already exist"})
        }
        const product=productData.create({
            productname:name,
            price,
            Quantity:quantity,
            Description:description,
            Quantity:quantity,
            Vendorid:shopId,
            Photo:image


        })
        return res.status(200).json({message:"Product added Succesfully", product})
        
    }
    catch(e){
        console.log(e)
       return res.status(500).json({message:"server side error"}) 
    }
}


// Get products by vendor
export const getProductByShop= async(req,res)=>{
    try{
    let shopId= req.params.VenderId
    const product= await productData.find({Vendorid:shopId})
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getproductById=async(req,res)=> {
    console.log('hittt');
    
try{
let productId=req.params.productId
console.log(productId);

let products=await productData.findById(productId)
console.log(products);

res.status(200).json(products);
}catch(error){
    res.status(500).json({message: error.message})
}
}
export const updateProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateData = {
      productname: req.body.name,
      price: req.body.price,
      Quantity: req.body.quantity,
      Description: req.body.description
    };

    if (req.file) {
      updateData.Photo = req.file.path;
    }

    const updatedProduct = await productData.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct=async(req,res)=>{
    try{
const{id}=req.params
// console.log(id);
const deleted=await productData.findByIdAndDelete(id)
   return res.status(200).json({message:"product deleted successfully"});

    }catch(e){
        console.log(e);
        
       return res.status(500).json({ message: e.message });
  
    }
}

export const allproducts=async(req,res)=>{
    try{
        const products=await productData.find().sort({createdAt : -1})
        // console.log(products);
        
   return res.status(200).json({message:"product get successfully",products});
    }
    catch (e){
           console.log(e);
        
       return res.status(500).json({ message: e.message });
    }
}

export const addProductReview = async (req, res) => {
    const { productId } = req.params;
    const { userId, rating, review } = req.body;

    if (!userId || !rating) {
        return res.status(400).json({ message: "userId and rating are required" });
    }

    try {
        const product = await productData.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if user already reviewed
        const existingReview = product.rating.reviews.find(
            (r) => r.userId.toString() === userId
        );

        if (existingReview) {
            // Update existing review
            existingReview.rating = rating;
            existingReview.review = review || "";
            existingReview.createdAt = new Date();
        } else {
            // Add new review
            product.rating.reviews.push({ userId, rating, review });
        }

        // Recalculate totalRating and avgrating
        const total = product.rating.reviews.reduce((acc, r) => acc + r.rating, 0);
        product.rating.totalRating = total;
        product.rating.avgrating = total / product.rating.reviews.length;

        await product.save();

        return res.status(200).json({
            message: "Review added/updated successfully",
            rating: product.rating,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
