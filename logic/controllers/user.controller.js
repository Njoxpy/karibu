const User = require("../models/userModel")

const login = (req, res) => {
    res.json({ message: "login user " })
}

const signup = (req, res) => {
    res.json({ message: "signup user " })
}

module.exports = {
    login,
    signup
}