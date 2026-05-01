const { BAD_REQUEST } = require("../constants/responseStatusCode");

const validateMessage = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(BAD_REQUEST).json({ message: "All fields are required" });
  }

  next();
};

module.exports = validateMessage;
