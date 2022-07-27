const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Use the logger middleware
// app.use(logger);

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
