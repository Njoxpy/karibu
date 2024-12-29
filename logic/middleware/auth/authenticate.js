const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../../constants/responseStatusCode");

const authenticate = (req, res, next) => {
    // Get the token from the Authorization header (e.g., 'Bearer <token>')
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is found, return a 401 Unauthorized response
    if (!token) {
        return res.status(UNAUTHORIZED).json({ error: "Authentication required" });
    }

    try {
        // Verify the token using JWT's secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user data to the request object for use in routes
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return a 401 Unauthorized response
        return res.status(UNAUTHORIZED).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticate;
