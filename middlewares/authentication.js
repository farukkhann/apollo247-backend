const jwt=require("jsonwebtoken")
require("dotenv").config()

const User=require("../models/user.model")

function verifytoken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECERET_KEY,(err,user)=>{
            if(err) return reject(err)
             resolve(user)
        })
        
    })
}

async function authenticate(req,res,next){
    // if(req.body)
    if(!req.headers.authorization){
        return res.status(400).send({message:"Auth token not provided"})
    }
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.status(400).send({message:"provided token is not Bearer token"})
    }
    const token=req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(400).send({message:"Please provide a valid token"})
    }
    console.log(token)

    let user;
    try {
        user=await verifytoken(token)
    } catch (err) {
        return res.status(400).send({
            message:"Authorization token is not provided or not valid"
        })
    }

    console.log(user)

    const compare=await User.findOne({_id:user.user._id})
    console.log(compare)
    if(compare){
        req.user=compare
        next()
    }
    else{
        return res.status(400).send("Please login first")
    }
}


module.exports=authenticate