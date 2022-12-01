const router=require("express").Router();
const User=require("../models/user")
const post=require("../models/post")
const bcrypt=require("bcrypt")

// update
router.put("/:id", async(req,res)=>{
    if (req.body.userId===req.params.id) {
        if (req.body.password) {
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }

        try {
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            const {password,...others}=updatedUser._doc;
            res.status(200).json(others);
          
            
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("you can only update your credential")
    }
})


// delete
router.delete("/:id", async(req,res)=>{
    if (req.body.userId===req.params.id) {

        try {
            const user=await User.findById(req.params.id)
            if(user){
               const personalPost = await post.findOne({userName:user.userName})
               if(personalPost){
                await post.deleteMany({userName:user.userName})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json(" user has deleted");
               }else{
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json(" user has deleted");
               }
                       
            }else{
               res.status(404).json("user not found")
            }
           
          
            
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("you can only update your credential")
    }
})

// get 
router.get("/:id",async(req,res)=>{
try {
    const user=await User.findById(req.params.id);
const {password,...others}=user._doc;
res.status(200).json(others);
} catch (error) {
    res.status(500).json(err)
}
})

module.exports = router;