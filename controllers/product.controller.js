

const express=require("express")


const router=express.Router()

const Product=require("../models/product.model")

router.post("/",async(req,res)=>{
    try {
        const data= await Product.create(req.body)
        res.status(400).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get("/",async(req,res)=>{
    try {
        const data= await Product.find().lean().exec()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports=router