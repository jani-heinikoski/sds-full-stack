const express = require("express");

const router = express.Router();

router.get("/register", (req, res) => {
    res.send("<h1>Register</h1>");
});

router.get("/authenticate", (req, res) => {
    res.send("<h1>Authenticate</h1>");
});

router.get("/profile", (req, res) => {
    res.send("<h1>Profile</h1>");
});

module.exports = router;
