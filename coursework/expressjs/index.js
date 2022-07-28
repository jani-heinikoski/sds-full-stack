const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const { engine } = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// Use the logger middleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Homepage route
app.get("/", (req, res) => {
    res.render("index");
});

// Body parser middleware
app.use(express.json({ type: "application/json" })); // Content-Type of req must match application/json or it won't be parsed
app.use(express.urlencoded({ extended: false }));

// Serve static assets from the /public path
app.use(express.static(path.join(__dirname, "public")));

// Members api routes
app.use("/api/members", require("./routes/api/members"));

app.listen(PORT, () => {
    console.log("server started on port", PORT);
});
