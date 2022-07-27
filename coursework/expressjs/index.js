const express = require("express");
const path = require("path");
const members = require("./Members");

const app = express();
const PORT = process.env.PORT || 3000;

// Get all members
app.get("/api/members", (req, res) => {
    res.json(members);
});

// Serve static assets from the /public path
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log("server started on port", PORT);
});
