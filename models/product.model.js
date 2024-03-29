

const mongoose =require("mongoose")


const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

const Product=mongoose.model("product",productSchema)


module.exports=Product