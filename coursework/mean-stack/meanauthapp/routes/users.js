const express = require("express");
// DB Models
const User = require("../db/models/user");
// DB Services
const addUser = require("../db/services/user/addUser");
const getUserById = require("../db/services/user/getUserById");
const getUserByUsername = require("../db/services/user/getUserByUsername");

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
    return res.status(400).json({ success: true, msg: "User registered." });
});

router.get("/authenticate", (req, res) => {
    res.send("<h1>Authenticate</h1>");
});

router.get("/profile", (req, res) => {
    res.send("<h1>Profile</h1>");
});

module.exports = router;
