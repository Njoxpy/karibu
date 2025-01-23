const rfs = require("rotating-file-stream");
const path = require("path");

// Create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // Rotate daily
    path: path.join(__dirname, "../logs") // Path to store logs
});

// Logging middleware
const loger = (req, res, next) => {
    const logEntry = `${req.ip} - ${req.method} - ${req.url} - ${new Date()}`;
    
    accessLogStream.write(logEntry + "\n"); // Write log entry to file

    next(); // Pass control to the next middleware
}

module.exports = loger;

// include status code for res