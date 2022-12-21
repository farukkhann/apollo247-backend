const express=require("express")
const {body,validationResult} =require("express-validator")
const router =express.Router()
const User=require("../models/user.model")

require("dotenv").config()

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


function authenticate(req,res,next){
    // if(req.body)
    console.log(req.headers)
}


function createNewToken(user){
   return jwt.sign(user, process.env.JWT_SECERET_KEY)
}



router.post("/register",
body("first_name").notEmpty().isString().bail(),
body("last_name").notEmpty().isString().bail(),
body("email").isEmail().notEmpty().bail(),
body("password").isStrongPassword().notEmpty().bail(),
async(req,res)=>{
    try {
        //check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //check if email already exists
        const emailUser= await User.findOne({email:req.body.email})
        if(emailUser) return res.status(400).send("Email already exists")

        //create a token using user 
        const user= await User.create(req.body)
        const token= createNewToken(req.body)
        res.status(200).send({user,token})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.post("/login",
body("email").notEmpty().isEmail().bail(),
body("password").isStrongPassword().notEmpty().bail(),
async (req,res)=>{
    try {
         //check for validation errors
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }
        //checking user is registered or not
        const searchUser= await User.findOne({email:req.body.email})
        if(!searchUser) return res.status(400).send("Please check your email and make sure you are registered")

        //check password
       const passwordcheck=searchUser.checkpass(req.body.password)
       if(!passwordcheck) return res.status(400).send("Please Enter correct password")

       const token= createNewToken(req.body)

        res.send({searchUser,token})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports=router