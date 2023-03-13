const express=require("express");
const productRoute=express.Router();
const {Productmodel}=require("../models/product.model");
const {auth}=require("../middlewares/middleware")
const {authenticates}=require("../middlewares/RBAC.middleware")
//products------------->route


productRoute.get("/products",auth,async(req,res)=>{
try {
    const data=await Productmodel.find({});
    res.send("products")
} catch (error) {
    res.send("getting error in products"+"   "+error.message)
}
})

productRoute.post("/addproducts",auth,authenticates(["seller"]),async(req,res)=>{
    try {
        const data= new Productmodel(req.body);
await data.save();
res.send("product added succesfully")
    } catch (error) {
        res.send("error in addproducts section"+"      "+error.message)
    }
})


productRoute.post("/deleteproduct/:id",auth,authenticates(["seller"]),async(req,res)=>{
    let product=req.params
    console.log(product.id)
    try {
        let data=await Productmodel.findOne({_id:product.id})
        if(data.userId==req.body.userId)
        {
            const data1=await Productmodel.findByIdAndDelete({_id:product.id})
            res.send("product deleted")
        }
    } catch (error) {
        res.send("error in deleting products"+"     "+error.message)
    }
})



module.exports={productRoute}