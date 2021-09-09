const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validation } = require("../middlewares/AuthMiddleware")

router.post("/signup", async (req, res) => {

    const { name, username, email, password } = req.body;


    const user = await Users.findOne({ where: { username: username } });
    if (user) res.json({ error: "USERNAME ALREADY EXIST" });

    else {

        const user1 = await Users.findOne({ where: { email: email } });
        if (user1) res.json({ error: "EMAIL IS ALREADY IN USE" });

        else {

            bcrypt.hash(password, 10).then((hash) => {
                Users.create({ name: name, username: username, email, password: hash,  postCount: 0 });

            });

            res.json("Created");
        }
    }
});

router.post("/login", async (req, res) => {

    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "USER NOT FOUND" });

    else {

        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                const accessToken = sign({ username: username, id: user.id }, "secretkey")
                res.json(accessToken);
            }
            else res.json({ error: "WRONG PASSWORD" });

        });
    }

});

router.get("/", validation, async (req, res) => {
    const l = await Users.findAll();
    res.json(l);
});
router.get("/auth",validation,async (req,res)=>{
    res.json(req.user);
})

router.post("/password", validation, async (req, res) => {
    const uname = req.user.username;
    bcrypt.hash(req.body.password, 10).then((hash) => {
        Users.update({ password: hash }, { where: { username: uname } });
    });
    res.json("Password updated");
})

module.exports = router