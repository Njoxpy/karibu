const User = require("../models/user/userModel");
const bcrypt = require("bcrypt");

// Check if admin exists, create one if not
const createFirstAdmin = async () => {
  try {
    // Check if there is already an admin
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      // Create the first admin user
      const hashedPassword = await bcrypt.hash("adminpassword", 10);
      const firstAdmin = new User({
        email: "yohana@gmail.com",
        password: hashedPassword,
        role: "admin",
        category: "animal-feeding",
      });

      await firstAdmin.save();
      console.log("First admin created successfully.");
    } else {
      console.log("Admin already exists.");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

// Call the function to ensure admin is created at startup or deployment
createFirstAdmin();

// http://localhost:5000/api/v1/animal-feeding/reports?startDate=2025-01-01&endDate=2025-01-31
