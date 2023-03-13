const express=require("express");
const app=express();
app.use(express.json());
const cookie = require('cookie-parser')
const {connection}=require("./config/config")
const {credRoute}=require("./routes/register")
const {productRoute}=require("./routes/product")
require('dotenv').config()
app.use("/cred",credRoute)
app.use("/pro",productRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server running at port number ${process.env.port} \n connected to data base`)
    } catch (error) {
        console.log("error in connecting server "+"  "+error)
    }
})