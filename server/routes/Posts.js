const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { Users,Likes } = require("../models")
const { validation } = require("../middlewares/AuthMiddleware");

router.post("/addpost", validation, async (req, res) => {
    const { title, postText } = req.body;
    const username = req.user.username;
    await Posts.create({ username: username, title: title, postText: postText });
    const user = await Users.findOne({ where: { username: username } });
    await Users.update({ postCount: user.postCount + 1 }, { where: { username: username } });
    res.json("SUCCESS");
});

router.get("/getallposts", validation, async (req, res) => {
    const posts = await Posts.findAll();
    res.json(posts);
})

router.get("/getpostsbyid/:id", validation, async (req, res) => {
    const id = req.params.id;
    const { username } = await Users.findOne({ where: { id: id } })
    const posts = await Posts.findAll({ where: { username: username } })
    res.json(posts);
})

router.get("/getpostbypostid/:id", validation, async (req, res) => {
    const id = req.params.id;
    const posts = await Posts.findOne({ where: { id: id } })
    const liked = await Likes.findOne({ where : {UserId:req.user.id,PostId:id}})
   
    if(liked){
        posts.dataValues.liked=true
    }
    else{
        posts.dataValues.liked=false
    }
    const liked_count = await Likes.findAll({where : {PostId : id}}) 
    posts.dataValues.liked_count=liked_count.length;
    res.json(posts);
})

router.delete("/:postId", validation, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
            username:req.user.username
        },
    });

    const username = req.user.username;
    const user = await Users.findOne({ where: { username: username } });
    await Users.update({ postCount: user.postCount - 1 }, { where: { username: username } });

    res.json("DELETED");
});


router.post("/edit/:postId", validation, async (req, res) => {
    const postId = req.params.postId;
    const username = req.user.username;
    const { title, postText } = req.body;
    await Posts.update({ postText: postText, title: title }, { where: { id: postId,username:username } });
    res.json("EDITED");
})
module.exports = router