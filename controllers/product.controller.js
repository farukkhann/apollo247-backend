

const express=require("express")


const router=express.Router()

const Product=require("../models/product.model")
const authenticate = require("../middlewares/authentication")
const User = require("../models/user.model")

router.delete("/:id",authenticate,async(req,res)=>{
    try {
        const id=req.params.id
        const response=await Product.deleteOne(id)
        res.send(response)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/",authenticate,async(req,res)=>{
    try {
        const data= await Product.create(req.body)
        res.status(400).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get("/",
authenticate,
async(req,res)=>{
    try {
        const data= await Product.find().lean().exec()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports=router