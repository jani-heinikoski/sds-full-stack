const express = require("express");
const router = express.Router();
const uuid = require("uuid");
let members = require("../../Members");

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

// Update a member
router.put("/:id", (req, res) => {
    let member = members.filter(
        (mber) => mber.id === parseInt(req.params.id)
    )[0];
    if (member) {
        members = members.map((elem) => {
            if (elem === member) {
                elem.name = req.body.name ? req.body.name : elem.name;
                elem.email = req.body.email ? req.body.email : elem.email;
            }
            return elem;
        });
        res.json(members);
    } else {
        res.status(400).json({ msg: `no member with id ${req.params.id}` });
    }
});

// Delete a member
router.delete("/:id", (req, res) => {
    let newMembers = members.filter(
        (mber) => mber.id !== parseInt(req.params.id)
    );
    if (newMembers.length !== members.length) {
        members = newMembers;
        res.json(members);
    } else {
        res.status(400).json({ msg: `no member with id ${req.params.id}` });
    }
});

module.exports = router;
