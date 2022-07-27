const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const members = [
    {
        id: 1,
        name: "John Doe",
        email: "john@gmail.com",
        status: "active",
    },
    {
        id: 2,
        name: "Johnnie Boy",
        email: "johnnieboy@gmail.com",
        status: "active",
    },
    {
        id: 3,
        name: "Top Kek",
        email: "w@l.com",
        status: "inactive",
    },
];

app.get("/api/members", (req, res) => {
    res.json(members);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log("server started on port", PORT);
});
