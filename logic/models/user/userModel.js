const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

// Define valid roles and categories for better consistency
const validRoles = ["employee", "admin"];
const validCategories = ["printing", "fresh-oil", "hardware", "animal-feeding", "godown", "stationery"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already in use"],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: {
        values: validRoles,
        message: "Invalid role. Choose between 'employee' and 'admin'.",
      },
      default: "employee",
    },
    category: {
      type: String,
      enum: {
        values: validCategories,
        message: "Invalid category. Choose a valid category.",
      },
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

// Encrypt password before saving or updating
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10; // You can make salt rounds configurable via environment variables.
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Signup method with category
userSchema.statics.signup = async function (email, password, role = "employee", category) {
  if (!email || !password || !category) {
    throw new Error("All fields (email, password, and category) are required");
  }

  // Check if email is already taken
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  // Create user with the specified role and category
  const user = new this({ email, password, role, category });
  await user.save();

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
