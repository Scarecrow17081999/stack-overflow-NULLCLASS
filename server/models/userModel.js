const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  about: {
    type: String,
  },
  tags: {
    type: [String],
  },
  joinedOn: {
    type: Date,
    default: Date.now,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpires: {
    type: Date,
    select: false,
  },
});
/// HASH THE PASSWORD BEFORE SAVE//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// COMPARE THE PASSWORD DURING THE LOGIN OR REGISTER //
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// GENERATE AUTH TOKEN FOR USER //
userSchema.methods.generateAuthToken = function (req, res) {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "30 days",
    });
    return token;
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// RESET PASSWORD //
userSchema.methods.getResetPasswordToken = function (req, res) {
  try {
    const resetToken = crypto.randomBytes(20).toString("hex");
    crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpires = Date.now() + 360000; // 6mins

    return resetToken;
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = mongoose.model("User", userSchema);
