const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (username.length < 3) {
    return res.status(400).json({
      status: 400,
      error: "InvalidInput",
      message: "Username must be at least 3 characters long.",
    });
  }
  if (password.length < 3) {
    return res.status(400).json({
      status: 400,
      error: "InvalidInput",
      message: "Password must be at least 3 characters long.",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({ allUsers });
};

const deleteAllUsers = async (req, res) => {
  const deleteAllUsers = await User.deleteMany({});
  res.status(200).json({ deleteAllUsers });
};

module.exports = {
  createUser,
  getAllUsers,
  deleteAllUsers,
};
