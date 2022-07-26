// Load env vars from .env file
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

const userRouter = require("./routes/user");
const menuRouter = require("./routes/menu");
const openingHourRouter = require("./routes/opening-hour");

const initPassportJWTStrategy = require("./initPassportJWTStrategy");
const initOpeningHours = require("./initOpeningHours");
const initAdminUser = require("./initAdminUser");

const app = express();
// If you change the PORT env var, change it also on the frontend
// by modifying the base URL in the BaseURL service.
const PORT = process.env.PORT || 3000;
// Initialize passport
app.use(passport.initialize());
initPassportJWTStrategy(passport, process.env.SECRET);
// Enable all CORS requests
app.use(cors({ optionsSuccessStatus: 200 }));
// JSON Body parsing, Content-Type of req must match application/json
app.use(express.json({ type: "application/json" }));
// Serve static assets
app.use(express.static(path.join(__dirname, "public")));
// Use user defined routers
app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/opening-hour", openingHourRouter);
// Index route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
// Connect to the MongoDB database and start the server after
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`Connected successfully to ${process.env.MONGO_URL}`);
        return initOpeningHours();
    })
    .then(() => {
        console.log("Initialized opening hours");
        return initAdminUser();
    })
    .then(() => {
        console.log("Initialized admin user");
        app.listen(PORT, () => {
            console.log("Server started on port", PORT);
        });
    })
    .catch((err) => {
        console.error("Database initialization failed.");
        throw err;
    });
// Handle errors after initial connection has been established
mongoose.connection.on("error", (err) => {
    console.error(err);
});
