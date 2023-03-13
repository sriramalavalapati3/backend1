var jwt = require('jsonwebtoken');
const fs = require('fs')
const {Usermodel}=require("../models/register.model")

const authenticates =(role_array)=>{

    return async(req, res, next) => {
        const id=req.body.userId
        console.log(id)
        const user= await Usermodel.findOne({_id:id})
        console.log(user)
        const userrole = user.role;
        console.log(userrole)
        if(role_array.includes(userrole)){
    
       
            next()
        }
        else{
            res.send("not authorised")
        }

} 

}

module.exports={
    authenticates
}