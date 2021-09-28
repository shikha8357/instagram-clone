
const mongoose=require("mongoose")
const { ObjectId } = mongoose.Schema.Types;
const userSchema= new mongoose.Schema({
    name:{
        type:String, 
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,

    },
    resetToken:String,
    expireToken:Date,
    pic:{
        type:String,
        default:"https://res.cloudinary.com/shikha123/image/upload/v1630051591/noimg_fu6wkt.png"
    },
    followers:[{ type: ObjectId, ref: "User" }],
    following:[{ type: ObjectId, ref: "User" }]
},{timestamps:true})
 module.exports=mongoose.model("User",userSchema);
