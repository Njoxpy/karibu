// utils/createAdmin.js
const User = require("./models/user/userModel");

const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      console.log("🔐 No admin found. Creating default admin...");

      const defaultAdmin = {
        email: process.env.ADMIN_EMAIL || "admin@savarrah.com",
        password: process.env.ADMIN_PASSWORD || "SavarrahAdmin123!",
        role: "admin",
        category: "stationery", // or any default valid category
      };

      await User.signup(
        defaultAdmin.email,
        defaultAdmin.password,
        defaultAdmin.role,
        defaultAdmin.category
      );

      console.log("✅ Admin user created:", defaultAdmin.email);
    } else {
      console.log("✅ Admin already exists. Skipping admin creation.");
    }
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  }
};

module.exports = createAdminUser;
