// module.exports={
//     MONGOURI:"mongodb+srv://gauri:gauri123@cluster0.vpfkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET:"yhyhyh"
// }

if(process.env.NODE_ENV=="production"){
module.exports=require("./prod")
}else{
module.exports=require("./dev")

}