const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Use the logger middleware
// app.use(logger);

// Get all members
app.get("/api/members", (req, res) => {
    res.json(members);
});

// Get a single member
app.get("/api/members/:id", (req, res) => {
    const member = members.filter(
        (mber) => mber.id === parseInt(req.params.id)
    );
    if (member.length === 0) {
        res.status(400).json({ msg: `no member with id ${req.params.id}` });
    } else {
        res.json(member);
    }
});

// Serve static assets from the /public path
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log("server started on port", PORT);
});
