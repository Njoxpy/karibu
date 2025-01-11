const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../../constants/responseStatusCode");

const authenticate = (req, res, next) => {
    try {
        // Check if Authorization header is present
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(UNAUTHORIZED)
                .json({ error: "Authorization header missing or malformed" });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res
                .status(UNAUTHORIZED)
                .json({ error: "Authentication token not found" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);


        // Attach the decoded user data to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message); // Log for debugging
        return res
            .status(UNAUTHORIZED)
            .json({ error: "Invalid or expired authentication token" });
    }
};

module.exports = authenticate;
