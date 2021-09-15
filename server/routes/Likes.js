const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { Users } = require("../models");
const { Likes } = require("../models");
const { validation } = require("../middlewares/AuthMiddleware");

router.post("/", validation, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;

    try {
        const findLike = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } })
        if (findLike) {
            await Likes.destroy({ where: { PostId: PostId, UserId: UserId } })
            res.json({ like: false })
        }
        else {
            await Likes.create({ PostId: PostId, UserId: UserId });
            res.json({ like: true })

        }
    }
    catch (exc) { res.json("No post with requested PostId") }
})
module.exports = router