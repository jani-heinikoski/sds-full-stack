const http = require("http");

// Create a server object
http.createServer((req, res) => {
    // send a res
    res.write("hello world");
    res.end();
}).listen(3000, () => console.log("server running on port 3000"));
