const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

// Get all members
router.get("/", (req, res) => {
    res.json(members);
});

// Get a single member
router.get("/:id", (req, res) => {
    const member = members.filter(
        (mber) => mber.id === parseInt(req.params.id)
    );
    if (member.length === 0) {
        res.status(400).json({ msg: `no member with id ${req.params.id}` });
    } else {
        res.json(member);
    }
});

// Create a member
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    };

    if (!newMember.name || !newMember.email) {
        res.status(400).json({ msg: "Please include a name and an email" });
    } else {
        members.push(newMember);
        res.json(members);
    }
});

module.exports = router;
