const mongoose=require("mongoose")

const connect =()=>{
   return  mongoose.connect("mongodb+srv://root:admin@cluster0.dyhii.mongodb.net/?retryWrites=true&w=majority")
}


module.exports=connect