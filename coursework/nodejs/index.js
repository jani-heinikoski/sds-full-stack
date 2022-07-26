//console.log("Hello from Node.js...");

// const person = require("./person");
// console.log(person);

// const Person = require("./person");
// const person1 = new Person("John Doe", 30);
// person1.greeting();

// const Logger = require("./logger");
// const logger = new Logger();
// logger.on("message", (data) => {
//     console.log(`Called listener: `, data);
// });
// logger.log("Hello world");
// logger.log("Hello world");
// logger.log("Hello world");
// logger.log("Hello world");

const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // if (req.url === "/") {
    //     fs.readFile(
    //         path.join(__dirname, "public", "index.html"),
    //         (err, data) => {
    //             if (err) throw err;
    //             res.writeHead(200, { "Content-Type": "text/html" });
    //             res.end(data);
    //         }
    //     );
    // } else if (req.url === "/about") {
    //     fs.readFile(
    //         path.join(__dirname, "public", "about.html"),
    //         (err, data) => {
    //             if (err) throw err;
    //             res.writeHead(200, { "Content-Type": "text/html" });
    //             res.end(data);
    //         }
    //     );
    // } else if (req.url === "/api/users") {
    //     const users = [
    //         { name: "John Doe", age: 40 },
    //         { name: "Bob Bobbie", age: 30 },
    //     ];
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify(users));
    // }

    // Build file path
    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html" : req.url
    );

    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = "text/html";

    // Check ext and set content type
    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    // Read file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                // Page not found
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end(data, "utf8");
                    }
                );
            } else {
                // Some server error
                res.writeHead(500);
                res.end("Server error");
            }
        } else {
            // Success
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data, "utf8");
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
