// permissionMiddleware.js
const checkPermissions = (allowedActions) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ message: "Unauthorized. User not authenticated." });
      }
  
      // Admins bypass permission checks
      if (user.role === "admin") {
        return next();
      }
  
      const action = req.method.toLowerCase(); // Determine the HTTP method (e.g., GET, POST, etc.)
  
      if (!allowedActions.includes(action)) {
        return res.status(403).json({
          message: `Access denied. You do not have permission to perform this operation (${action}).`,
        });
      }
  
      next(); // Permission is valid, proceed
    };
  };
  
  module.exports = checkPermissions;
  