const express = require("express");
const router = express.Router();
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

module.exports = router;
