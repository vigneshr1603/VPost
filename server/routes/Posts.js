const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { Users } = require("../models")
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
    res.json(posts);
})

router.delete("/:postId", validation, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
    });

    const username = req.user.username;
    const user = await Users.findOne({ where: { username: username } });
    await Users.update({ postCount: user.postCount - 1 }, { where: { username: username } });
    
    res.json("DELETED");
});
module.exports = router