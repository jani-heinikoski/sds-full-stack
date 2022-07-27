const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Use the logger middleware
// app.use(logger);

// Serve static assets from the /public path
app.use(express.static(path.join(__dirname, "public")));

// Members api routes
app.use("/api/members", require("./routes/api/members"));

app.listen(PORT, () => {
    console.log("server started on port", PORT);
});
