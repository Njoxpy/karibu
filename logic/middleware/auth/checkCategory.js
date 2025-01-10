// categoryAccess.js (middleware)
const checkCategory = (allowedCategories) => {
  if (!Array.isArray(allowedCategories)) {
    throw new Error("Allowed categories must be an array");
  }

  return (req, res, next) => {
    try {
      const user = req.user; // Assuming user info is attached in a previous middleware

      if (!user) {
        return res.status(401).json({ message: "Unauthorized. User not authenticated." });
      }

      // Admins have unrestricted access
      if (user.role === "admin") {
        return next();
      }

      // Check if the user's category is allowed
      if (!allowedCategories.includes(user.category)) {
        return res.status(403).json({
          message: `Access denied. Your category (${user.category}) is not authorized for this page.`,
        });
      }

      // Allow access if checks pass
      next();
    } catch (error) {
      console.error("Error in category access middleware:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = checkCategory;
