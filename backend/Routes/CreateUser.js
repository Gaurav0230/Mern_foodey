const express=require('express')
const router=express.Router()
const User= require('../models/User')
const { body, validationResult } = require('express-validator');


const bcrypt= require('bcryptjs');
const jwt=require("jsonwebtoken")

const jwtSecret="Mynameissomethingyoudontwanahear"




router.post("/createuser",body('email',"Invalid email").isEmail(),body('password',"Invalid password").isLength({min:5}),async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const salt= await bcrypt.genSalt(10);
    let secpassword= await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secpassword

        })
        res.json({success:true})
    }
    catch(error) {
        console.log(error)
        res.json({success:false})
    }
})


router.post("/loginuser",body('email',"Invalid email").isEmail(),body('password',"Invalid password").isLength({min:5}),async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    let email=req.body.email
    try {
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({ errors: "Try logging in with correct credentials"})
        }

        const pwdcompare= await bcrypt.compare(req.body.password,userData.password)

        if(!pwdcompare){
            return res.status(400).json({ errors: "Try logging in with correct credentials"})

        }

        const data={
            userid:{
                id:userData.id
            }
        }

        const authToken=jwt.sign(data,jwtSecret)
        return res.json({success:true,authToken:authToken})
    }
    catch(error) {
        console.log(error)
        res.json({success:false})
    }
})


module.exports=router;