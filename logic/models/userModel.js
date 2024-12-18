const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
    category: {
      type: String,
      enum: ["printing", "fresh-oil", "hardware", "animal-feeding", "godown", "stationery"],
      required: true
    }
  },
  { timestamps: true }
);


userSchema.statics.signup = async function (email, password, role = "employee") {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password should be strong");
  }

  // Validate role
  if (!["employee", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  // validate industry category
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user with the specified role
  const user = await this.create({ email, password: hash, role });
  return user;
};


// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
