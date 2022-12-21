
const mongoose=require("mongoose")
const bicrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    first_name:{type:String,required:false},
    last_name:{type:String,required:false},
    email:{type:String,required:true},
    password:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

userSchema.methods.checkpass=function(password){
    return bicrypt.compareSync(password,this.password)
}



userSchema.pre("save",function(next){
    const hash= bicrypt.hashSync(this.password,8)
    this.password=hash
    next()
})



const User= mongoose.model('user',userSchema)

module.exports=User

