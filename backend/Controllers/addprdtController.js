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
try{
let productId=req.params.productId
let products=await productData.find({productId:productId})
}
}



