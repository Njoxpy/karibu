const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import user model

// Middleware to check if the user is authenticated
const requireAuth = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    // Extract the token from 'Bearer <token>' format
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the token
    jwt.verify(tokenWithoutBearer, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Attach user id to the request object
        req.user = decodedToken;

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = {
    requireAuth
};
