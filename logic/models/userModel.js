const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unque: true
    },
    password: {
      type: String,
      required: true
    }
  }
)

// static signup method
userSchema.statics.signup = async function (email, password) {

  if (!email || !password) {
    throw new Error("all fields are required");

  }

  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");

  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("password should be strong");
  }
  const exists = await this.findOne({
    email
  })
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })
  return user
}

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("all fields are required");
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw new Error("Incorrect e-mail");
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error("Incorrect password");
  }
  return user
}

module.exports = mongoose.model("User", userSchema)