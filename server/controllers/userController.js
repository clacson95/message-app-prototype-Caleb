const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../config/generateToken");


// ==========================================================
// ==========================================================
// Sign Up Functionality
// ==========================================================
// ==========================================================
const registerUser = asyncHandler(async () => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new err("Please fill out all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new err("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    token: generateToken(user._id),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new err("Unable to create user");
  }
});

// ==========================================================
// ==========================================================
// Login Functionality
// ==========================================================
// ==========================================================

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new err("Invalid email or password");
    }
});

// ==========================================================
// ==========================================================
// Search User Functionality
// ==========================================================
// ==========================================================

// /api/user?search= ${name} or ${email}
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    // Mongoose $or operator specifies what we can search for
    $or: [
      { name: { $regex: req.query.search, $options: "i" }}, // Using a regex to query name search
      { email: { $regex: req.query.search, $options: "i"}}, // Using a regex to query email search
    ],
  }
  : {};
})

module.exports = { registerUser, authUser };
