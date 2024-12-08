// Middleware to check user role
const checkRole = (role) => {
    return (req, res, next) => {
        // Check if the user role matches the required role
        if (req.user.role !== role) {
            return res.status(403).json({ error: "Access denied" });
        }

        // Proceed to the next middleware or route handler if role matches
        next();
    };
};

module.exports = {
    checkRole
};
