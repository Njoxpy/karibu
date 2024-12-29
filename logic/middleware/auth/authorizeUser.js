const { FORBIDDEN } = require("../../constants/responseStatusCode");

const authorizeUser = (role) => {
    return (req, res, next) => {
        if (role && req.user.role !== role) {
            return res.status(FORBIDDEN).json({ error: "You do not have the required role to access this resource" });
        }
        next();
    };
};

module.exports = authorizeUser;
