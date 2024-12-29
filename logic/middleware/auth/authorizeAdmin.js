const { FORBIDDEN } = require("../../constants/responseStatusCode");

const authorizeAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
        return res.status(FORBIDDEN).json({ error: "Access denied. Admins only." });
    }

    // Proceed to the next middleware or route handler if user is an admin
    next();
};

module.exports = authorizeAdmin;
