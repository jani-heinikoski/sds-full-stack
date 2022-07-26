const url = require("url");

const myURL = new URL(
    "http://mywebsite.com:8080/hello.html?id=1337&status=active"
);

// Serialized URL
console.log(myURL.href);
console.log(myURL.toString());

// Host (root domain)
console.log(myURL.host);

// Hostname
console.log(myURL.hostname);

// Pathname
console.log(myURL.pathname);

// Serialized query
console.log(myURL.search);

// Params obj
console.log(myURL.searchParams);

// Add param
myURL.searchParams.append("abc", "123");
console.log(myURL.searchParams);

// Loop through params
myURL.searchParams.forEach((v, n) => console.log(`${n}=${v}`));
