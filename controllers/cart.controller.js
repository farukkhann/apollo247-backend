

const express=require("express")
const router=express.Router()

const authenticate=require("../middlewares/authentication")
const Cart = require("../models/cart.model")



router.post("/",authenticate,async(req,res)=>{
    try {
        const product=await Cart.create(req.body)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get("/",authenticate,async(req,res)=>{
    try {
        const cart=await Cart.find().lean().exec()
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports=router

