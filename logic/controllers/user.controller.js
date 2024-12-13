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
        const users = await User.find()
        if (users.length === 0) {
            return res.status(NOT_FOUND).json({ message: "not user found" })
        }
        res.status(OK).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginUser,
    signupUser,
    getAllUsers
};
