const {
  NOT_FOUND,
  OK,
  BAD_REQUEST,
  SERVER_ERROR,
} = require("../constants/responseStatusCode");
const User = require("../models/user/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Helper function to create a token (now includes category)
const createToken = (_id, role, category) => {
  return jwt.sign({ _id, role, category }, process.env.SECRET, {
    expiresIn: "30d",
  }); // 30 days token expiration
};

// Login user (Modified to include category in the token)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Email and password are required" });
    }

    // Try to login using the User model method
    const user = await User.login(email, password);

    // Create a token with category
    const token = createToken(user._id, user.role, user.category);

    // Return response with token and user details
    res.status(OK).json({
      email: user.email,
      role: user.role,
      category: user.category,
      token,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: "user not registered" });
  }
};

const createAdminController = async (req, res) => {
  const { secretKey } = req.body;

  if (secretKey !== process.env.SECRET) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminCategory = "stationery";

    const user = await User.signup(
      adminEmail,
      adminPassword,
      "admin",
      adminCategory,
    );
    const token = createToken(user._id, user.role, user.category);

    res.status(201).json({
      message: "Admin created successfully",
      email: user.email,
      role: user.role,
      category: user.category,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Signup user (Modified to include category in the token)
const signupUser = async (req, res) => {
  const { email, password, role, category } = req.body;

  // Validate input fields (email, password, category)
  if (!email || !password || !category) {
    return res.status(BAD_REQUEST).json({
      error: "All fields (email, password, and category) are required",
    });
  }

  // Default role to "employee" if not provided
  const userRole = role || "employee";

  try {
    // Attempt to sign up the user
    const user = await User.signup(email, password, userRole, category);

    // Create a token for the new user, now including category
    const token = createToken(user._id, user.role, user.category);

    // Respond with success message, user details, and token
    res.status(201).json({
      email: user.email,
      role: user.role,
      category: user.category,
      token,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    // If no users are found, return a 404 response
    if (users.length === 0) {
      return res.status(NOT_FOUND).json({ message: "No users found" });
    }

    // Respond with the list of users
    res.status(OK).json(users);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(NOT_FOUND).json({ mesage: "User not found" });
    }

    res.status(OK).json(user);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { id } = req.params; // The user ID is expected in the URL parameters
  const { email, password, role, category } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check for duplicate email if updating the email field
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use." });
      }
      user.email = email;
    }

    // Update the password if provided (ensure it's hashed)
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Assuming bcrypt is used for hashing
      user.password = hashedPassword;
    }

    // Update other fields if provided
    if (role) user.role = role;
    if (category) user.category = category;

    // Save the updated user
    await user.save();

    // Respond with the updated user (omit sensitive fields like password)
    const { password: _, ...updatedUser } = user.toObject(); // Exclude password
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    // Handle duplicate key error (E11000)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate value detected", error: error.keyValue });
    }

    // General error handling
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params; // The user ID is expected in the URL parameters

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);

    // If user is not found, return 404
    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    // Respond with a success message
    res.status(OK).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const availableUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(OK).json({ userCount });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};
module.exports = {
  loginUser,
  signupUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  availableUserCount,
  createAdminController,
};
