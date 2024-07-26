const express = require('express')
const router= express.Router()
const {OrderModel} = require('../models/Orders')

router.post('/Orderdata',async (req,res)=>{
    console.log(req.body)
    let data=req.body.order_data
    // return res.send({data:"Hello"})
    await data.splice(0,0,{order_date:req.body.order_data})

    let eId=await OrderModel.findOne({'email': req.body.email})
    
    if(eId=== null){
        try{
            await OrderModel.create({
                email: req.body.email,
                order_data: [data]

            })
            return res.send({success:true})
        }catch(error){
            console.log("Error on first block: ")
            console.log(error.message)
          return  res.send("server error",error.message)
        }
    }
    else{
        try{
            await OrderModel.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}
            ).then(()=>{
              return  res.json({success:true})
            })
        }catch(error){
            console.log("Error on second block: ")
          return  res.send("server error",error.message)
        }
    }
})

module.exports= router;