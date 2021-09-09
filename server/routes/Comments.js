const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { Users } = require("../models")
const {validation}=require("../middlewares/AuthMiddleware");
const { Comments } = require("../models"); 

router.get("/getComments/:postId", async (req,res)=>{
    const postId=req.params.postId 
    const comments = await Comments.findAll({where :{PostId:postId}})
    res.json(comments);
})

router.post("/addComment",validation,async (req,res)=>{
    const comment=req.body; 
    comment.username = req.user.username; 
    await Comments.create(comment);
    res.json(comment);

})
router.delete("/:commentId",validation,async(req,res)=>{
    const commentId=req.params.commentId;
    await Comments.destroy({where:{id:commentId}}); 
    res.json("Deleted");


})
module.exports=router