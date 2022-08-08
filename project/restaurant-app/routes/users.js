const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
// DB Models
const User = require("../db/models/user");
// DB Services
const addUser = require("../db/services/user/addUser");
const getUserById = require("../db/services/user/getUserById");
const getUserByUsername = require("../db/services/user/getUserByUsername");
const comparePassword = require("../db/services/user/comparePassword");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        await addUser(
            new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            })
        );
    } catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ success: false, msg: "Failed to register user." });
    }
    return res.status(201).json({ success: true, msg: "User registered." });
});

router.post("/authenticate", async (req, res) => {
    try {
        const user = await getUserByUsername(req.body.username);
        const isMatch = await comparePassword(req.body.password, user.password);
        if (isMatch) {
            const token = jsonwebtoken.sign(
                { _id: user._id },
                process.env.SECRET,
                {
                    expiresIn: 604800,
                }
            );
            return res.status(200).json({
                success: true,
                msg: "User authenticated.",
                user: {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        }
    } catch (err) {
        console.error(err);
    }
    return res
        .status(400)
        .json({ success: false, msg: "Failed to authenticate." });
});

router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.status(200).json({
            success: true,
            msg: "You are authorized.",
            profile: {
                name: req.user.name,
                username: req.user.username,
                email: req.user.email,
            },
        });
    }
);

module.exports = router;
