const router=require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcrypt")
// register
router.post("/register", async(req,res)=>{
try {
    const salt= await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt)
    const newUser=new User({
    userName:req.body.userName,
    email:req.body.email,
    password:hashPassword,
    });
    const user=await newUser.save()
    res.status(200).json(user)
//  res.send("it works")
} catch (error) {
    res.status(500).json(error)
}
})


// login
router.post("/login",async(req,res)=>{
try {
    const user=await User.findOne({userName:req.body.userName})
    if (user) {
      const validate=await bcrypt.compare(req.body.password,user.password)  
     
      if(validate){
        const {password,...others}=user._doc;
        res.status(200).json(others);
      }else{
        res.status(400).json("wrong credential");
      }
    }else{
        res.status(400).json("wrong credential")
    }
} catch (error) {
    res.status(500).json(error)
}
})

module.exports = router;