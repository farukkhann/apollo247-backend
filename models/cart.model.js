
const mongoose=require("mongoose")


const cartSchema=new mongoose.Schema({
    title:{type:String},
    Manfacturer:{type:String},
    description:{type:String},
    type:{type:String},
    exires_on:{type:String},
    country_origin:{type:String},
    Manfacturer_address:{type:String},
    size:{type:String},
    category:{type:String},
    image:{type:String},
    id:{type:String},
},{
    timestamps:true,
    versionKey:false
})





const Cart= mongoose.model("cart",cartSchema)


module.exports=Cart