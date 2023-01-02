const express=require("express")
const app=express()
require("dotenv").config()
const connect=require("./config/db")

const cors=require("cors")

app.use(cors())

const port=process.env.PORT||5000
app.use(express.json())

const userController=require("./controllers/user.controller")
app.use("/auth",userController)

const productController=require("./controllers/product.controller")
app.use("/products",productController)

const cartController=require("./controllers/cart.controller")
app.use("/cart",cartController)

connect()


app.listen(port,async()=>{
    try {
        console.log("Database connected successfully")
        console.log("port "+port + " is running")
    } catch (error) {
        console.log(error.message)
    }
})

