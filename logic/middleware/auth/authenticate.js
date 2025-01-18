const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../../constants/responseStatusCode");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(UNAUTHORIZED)
        .json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(UNAUTHORIZED)
        .json({ error: "Authentication token not found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message); // Log for debugging
    return res
      .status(UNAUTHORIZED)
      .json({ error: "Invalid or expired authentication token" });
  }
};

module.exports = authenticate;
