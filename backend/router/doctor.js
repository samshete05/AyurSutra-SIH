const express = require("express");
const doctorRouter = express.Router();

const z = require('zod');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const doctorModel = require("../models/Doctor.model");




doctorRouter.post("/login", async function(req,res){
    const requiredatas=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(5).max(100)
    })

    const checkdata=requiredatas.safeParse(req.body);
    if(!checkdata.success){
       res.json({
           message:checkdata.error,
       })
       return;
    }

    const {email,password} =req.body;
    console.log("login in bac",email)
    console.log("login in bac",password)

    const checkedUser=await doctorModel.findOne({
       email:email
    })

    if(!checkedUser){
        res.json({
            message:"User_not_exists"
        })
        return;
    }

    const finduser= await bcrypt.compare(password,checkedUser.password);
    
    if(finduser){
        const token=jwt.sign({
            id:checkedUser._id
        },JWT_KEY)
        res.json({
            token:token,
            message:"logedin"
        })
    }else{
        res.json({
            message:"User_not_exists"
        })
        return;
    }           
})



module.exports={
    doctorRouter:doctorRouter
}