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