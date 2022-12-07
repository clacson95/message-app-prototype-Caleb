const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../config/generateToken");

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

module.exports = { registerUser };
