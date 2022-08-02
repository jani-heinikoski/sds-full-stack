require("dotenv").config();
const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/meanauth";
const SECRET = process.env.SECRET || "secret";
// Enable all CORS requests
app.use(cors({ optionsSuccessStatus: 200 }));
// JSON Body parsing, Content-Type of req must match application/json
app.use(express.json({ type: "application/json" }));
// Serve static assets
app.use(express.static(path.join(__dirname, "public")));
// Use user defined routers
app.use("/users", usersRouter);
// Index route
app.get("/", (req, res) => {
    res.send("index");
});
// Connect to the MongoDB database and start the server after
mongoose.connect(MONGO_URL).then(
    () => {
        console.log(`Connected successfully to ${MONGO_URL}`);
        app.listen(PORT, () => {
            console.log("Server started on port", PORT);
        });
    },
    (err) => {
        console.error("Can't connect to MongoDB");
        throw err;
    }
);
// Handle errors after initial connection has been established
mongoose.connection.on("error", (err) => {
    console.error(err);
});
