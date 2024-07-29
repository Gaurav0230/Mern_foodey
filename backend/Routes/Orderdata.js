const express = require('express')
const router= express.Router()
const {OrderModel} = require('../models/Orders')

router.post('/Orderdata',async (req,res)=>{
    console.log(req.body)
    let data=req.body.order_data
    // return res.send({data:"Hello"})
    

    let eId=await OrderModel.findOne({'email': req.body.email})
    
    if(eId=== null){
        try{
            await OrderModel.create({
                email: req.body.email,
                order_data: data.order_data,

            })
            return res.send({success:true})
        }catch(error){
            console.log("Error on first block: ")
            console.log(error.message)
          return  res.status(500).send("server error")
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
          return  res.status(500).send("server error",error.message)
        }
    }
})

router.get("/getOrders", async(req, res)=>{
    let orders = [];
    try {
        
        const email = req.query['email']
        if(email){
            const orderdoc = await OrderModel.findOne({email:email
            });
            console.log(orderdoc)
            if(orderdoc){
                orders = orderdoc.order_data
            }
            console.log("Orders ", orders)
        }
        
    } catch (error) {
        console.log("Error Occured at Getting orders", error);
    }
    return res.status(200).json(orders);
})

module.exports= router;