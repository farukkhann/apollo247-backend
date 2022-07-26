const express=require("express")

const app=express()
const connect=require("./config/db")




app.listen(8080,async()=>{
    try {
        await connect()
        console.log("db is connected")
        console.log("port 8080 is running") 
    } catch (error) {
        console.log(error)
    }


})