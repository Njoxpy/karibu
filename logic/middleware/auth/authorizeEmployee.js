const { FORBIDDEN } = require("../../constants/responseStatusCode");

const authorizeEmployee = (category) => {
    return (req, res, next) => {
        // Check if the user is an employee
        if (req.user.role !== "employee") {
            return res.status(FORBIDDEN).json({ error: "Access denied. Employees only." });
        }

        // If a category is provided, check if the user's category matches
        if (category && req.user.category !== category) {
            return res.status(FORBIDDEN).json({ error: `Access denied to ${category} resources` });
        }

        // Proceed to the next middleware or route handler if user is an employee and category matches
        next();
    };
};

module.exports = authorizeEmployee;
