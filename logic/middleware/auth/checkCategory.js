const { FORBIDDEN } = require("../../constants/responseStatusCode");

const checkCategory = (category) => {
    return (req, res, next) => {
        if (category && req.user.category !== category) {
            return res.status(FORBIDDEN).json({ error: `You are not authorized to access ${category} pages` });
        }
        next();
    };
};

module.exports = checkCategory;
