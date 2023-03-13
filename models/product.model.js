const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    "metal":String,
    "userId":String,
    "price":Number,
    "Quantity":Number
})
const Productmodel=mongoose.model("productdata",productSchema);
module.exports={Productmodel}