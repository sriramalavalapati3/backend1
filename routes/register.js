const express=require("express");
const credRoute=express.Router();
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
require('dotenv').config()
const fs=require("fs")
const {Usermodel}=require("../models/register.model")
//register------------>route
credRoute.post("/register",async(req,res)=>{
    const {name,email,password,role,mobile}=req.body;
    try {
        bcrypt.hash(password,4, async(err, hash)=>{
            if(err){
                res.send("registration failed"+"   \n "+err.message)
            }else{
                let data=new Usermodel({name,email,password:hash,role,mobile});
                await data.save();
                res.send("registration succesfull")
            }
        });  
    } catch (error) {
        res.send("error in registation route "+"   "+error)
    }
    
})


//login------->route
credRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
    
        const user=await Usermodel.findOne({email})
        if(user){
        bcrypt.compare(password, user.password, function(err, result) {
        if(result){
        const token = jwt.sign({userID:user._id},process.env.token,{expiresIn:"120s"});
        const refresh=jwt.sign({userID:user._id},process.env.secret,{expiresIn:"300s"});
        
        console.log(token+"\n"+"refreshtoken:\n"+refresh)
        res.cookie("Token",token);
        res.cookie("Refresh",refresh)
        res.send({"msg":"Login Successfull","token":token})
        } else {res.send("Wrong Credntials")}
        });
        } else {
        res.send("Wrong Credntials")
        }
        }
    catch (error) {
    res.send("Something went wrong")
    console.log(err)
    
    }
})

//logout--------------->route

credRoute.post("/logout",async(req,res)=>{
    const token=req.headers.authorization;
    const blocklisted=JSON.parse(fs.readFileSync("blacklist.json","utf-8"))
    blocklisted.push(token);
    fs.writeFileSync("blacklist.json",JSON.stringify(blocklisted))
    res.send("logout sucesfully")
    })


module.exports={credRoute}
