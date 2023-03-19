const express= require("express")
const dotenv=require("dotenv")
const app=express()
const mongoose = require('mongoose');
const authRoot=require("./routes/auth")
const userRoot=require("./routes/user")
const postRoot=require("./routes/post")
const categoryRoot=require("./routes/caetogory")
const multer=require("multer")
const cors = require("cors")
const path=require("path")
dotenv.config()
app.use(express.json())
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"images")))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log("DB Connection Successfull! 2"))
.catch((err) => {
  console.log(err);
});

const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images");
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name);
  },
});

const upload=multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
res.status(200).json("file has been uploaded")
});

app.use("/api/auth",authRoot)
app.use("/api/users",userRoot)
app.use("/api/posts",postRoot)
app.use("/api/categories",categoryRoot)
app.listen('5000',()=>{
    console.log("server is running ")
})

module.exports=app