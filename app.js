const express = require("express");
const app = express();
const PORT=process.env.PORT || 5000
const mongoose = require("mongoose");
const userRoute=require("./models/user");
const postRoute=require("./models/post");
const cors=require("cors")
app.use(cors());
// const authRoute=require("./routes/auth");cd
const {MONGOURI}=require("./config/keys")




    mongoose.connect(MONGOURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on("connected",()=>{
        console.log("connected to mongodb");
    })
    mongoose.connection.on("err",(err)=>{
        console.log("err",(err));
    })


app.use(express.json());
app.use(express.urlencoded({extended:true}));
    
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));


//deploying part
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"))
    const path=require ("path")
    app.get("*",(req,res)=>{
       res.sendFile(path.resolve(_dirname,"client","build","index.html"))
    })
}


app.listen(PORT, () => {
    console.log("server running on port 5000");
})