const { NOT_FOUND, OK, BAD_REQUEST, SERVER_ERROR } = require("../constants/responseStatusCode");
const User = require("../models/user/userModel");
const jwt = require("jsonwebtoken");

// Helper function to create a token
const createToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "30d" }); // 30 days token expiration
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(BAD_REQUEST).json({ error: "Email and password are required" });
        }

        // Try to login using the User model method
        const user = await User.login(email, password);

        // Create a token
        const token = createToken(user._id, user.role);

        // Return response with token and user details
        res.status(OK).json({
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({ error: error.message });
    }
};

// Controller function for creating a new user
const createUser = async (req, res) => {
    try {
        const { email, password, role, category } = req.body;

        // Validate input fields (email, password, category)
        if (!email || !password || !category) {
            return res.status(BAD_REQUEST).json({ error: "All fields (email, password, and category) are required" });
        }

        // Check if the email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(BAD_REQUEST).json({ error: "Email already in use" });
        }

        // Create a new user with the provided details
        const newUser = new User({ email, password, role, category });
        await newUser.save();

        // Respond with success message and new user details
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(SERVER_ERROR).json({ error: "Server error" });
    }
};

// Sign up user
const signupUser = async (req, res) => {
    const { email, password, role, category } = req.body;

    // Validate input fields (email, password, category)
    if (!email || !password || !category) {
        return res.status(BAD_REQUEST).json({ error: "All fields (email, password, and category) are required" });
    }

    // Default role to "employee" if not provided
    const userRole = role || "employee";

    try {
        // Attempt to sign up the user
        const user = await User.signup(email, password, userRole, category);

        // Create a token for the new user
        const token = createToken(user._id, user.role);

        // Respond with success message, user details, and token
        res.status(201).json({
            email: user.email,
            role: user.role,
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

// Update user details
const updateUser = async (req, res) => {
    const { userId } = req.params; // The user ID is expected in the URL parameters
    const { email, password, role, category } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        // If user is not found, return 404
        if (!user) {
            return res.status(NOT_FOUND).json({ message: "User not found" });
        }

        // Update the user with the new data
        if (email) user.email = email;
        if (password) user.password = password;
        if (role) user.role = role;
        if (category) user.category = category;

        // Save the updated user
        await user.save();

        // Respond with the updated user
        res.status(OK).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { userId } = req.params; // The user ID is expected in the URL parameters

    try {
        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(userId);

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

module.exports = {
    loginUser,
    signupUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
