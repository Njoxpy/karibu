const { NOT_FOUND, OK } = require("../constants/responseStatusCode");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "30d" });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id, user.role);

        res.status(200).json({
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// userController.js

// Controller function for creating a new user
const createUser = async (req, res) => {
    try {
        const { email, password, role, category } = req.body;

        if (!email || !password || !category) {
            return res.status(400).json({ error: "All fields (email, password, category) are required" });
        }

        // Check if the email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Create the new user with the provided details
        const newUser = new User({ email, password, role, category });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Sign up user
const signupUser = async (req, res) => {
    const { email, password, role } = req.body;

    // Default role to "employee" if not provided
    const userRole = role || "employee";

    try {
        const user = await User.signup(email, password, userRole);

        const token = createToken(user._id, user.role);

        res.status(201).json({
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        if (users.length === 0) {
            return res.status(NOT_FOUND).json({ message: "No user found" })
        }
        res.status(OK).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginUser,
    signupUser,
    getAllUsers,
    createUser
};
