const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, name, password, blog } = req.body;

  const checkUser = await User.findOne({ username });
  if (checkUser) {
    res.status(409).json({
      message:
        "User already exists, please use different username or login instead",
    });
  }

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
    blog: blog || [],
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).populate("blogs");
  res.status(200).json({ allUsers });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).populate("blogs", "title");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({
    username: user.username,
    name: user.name,
    blogs: user.blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
    })),
  });
};

const deleteAllUsers = async (req, res) => {
  const deleteAllUsers = await User.deleteMany({});
  res.status(200).json({ deleteAllUsers });
};

module.exports = {
  createUser,
  getAllUsers,
  deleteAllUsers,
  getUserById,
};
