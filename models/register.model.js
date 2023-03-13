const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    "name":String,
    "email":String,
    "mobile":Number,
    "password":String,
    "role":{type : String, enum : ["customer", "seller"], default : "customer"}
})
const Usermodel=mongoose.model("userdata",userSchema);
module.exports={Usermodel}