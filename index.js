// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

function extractOS(userAgent) {
    // Add your logic here to extract the OS information from the user agent string
    // This can be done using regular expressions or any other method you prefer
    
    // Example implementation using a regular expression
    const osRegex = /(\(.*?\))/;
    const matches = userAgent.match(osRegex);
    
    if (matches && matches.length > 0) {
        return matches[1];
    } else {
        return "Unknown";
    }
}
// your first API endpoint...
app.get("/api/whoami", function (req, res) {
    const headers = req.headers['user-agent']
    const os = extractOS(headers);
    res.json({
        ipaddress: req.socket.localAddress,
        language: req.headers["accept-language"],
        software: os,
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
