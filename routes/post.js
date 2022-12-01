const router=require("express").Router();
const User=require("../models/user")
const Post=require("../models/post")


// create post
router.post("/",async(req,res)=>{
    
    const newPost =new Post(req.body);
 try {
    const savesPost= await newPost.save();
    res.status(200).json(savesPost)
 } catch (error) {
    res.status(500).json(error)
 }

})

// update poste
router.put("/:id",async(req,res)=>{
    try {
        const post =await Post.findById(req.params.id)
        if(post.userName===req.body.userName){
        try {
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedPost)
        } catch (error) {
            res.status(500).json(error)
        }
        }else{
            res.status(401).json("you can update only your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

// delete post 
router.delete("/:id",async(req,res)=>{
    try {
        const post =await Post.findById(req.params.id)
        if(post.userName===req.body.userName){
        try {
            await post.delete();
            res.status(200).json("post has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
        }else{
            res.status(401).json("you can delete only your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})
//  get post
router.get("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch (error) {
        res.status(500).json(err)
    } 
})

// get all posts
router.get("/",async(req,res)=>{
   
    const userName=req.query.user;
    const cateName=req.query.cat;
try {
    let posts;
    if (userName) {
        posts=await Post.find({userName})
    }else if(cateName){
        posts=await Post.find({
            categories:{
                $in:[cateName],
            }
        })
    }else{
        posts=await Post.find();
    }
    res.status(200).json(posts)
} catch (error) {
  res.status(500).json(err)
}
})

module.exports = router;