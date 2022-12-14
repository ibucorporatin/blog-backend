const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,  
    },
   userName: {
    type:String,
    required:true
    },
    categories:{
        type:String,
        required:false,
    }
},{timestamps:true});

module.exports=mongoose.model("post",postSchema)