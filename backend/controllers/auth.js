require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const jwtSecret = process.env.JWT_SECRET;
const createUser = async (req, res) => {
  try {
    const user = req.body;
    const { username, email, password, firstname, lastname } = user;
    const foundByUsername = await User.findOne({ username });
    const foundByEmail = await User.findOne({ email });

    if (!username || !email || !password || !firstname || !lastname) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (foundByUsername) {
      return res
        .status(400)
        .json({ error: "Username is already exist, choose another", username });
    }
    if (foundByEmail) {
      return res
        .status(400)
        .json({ error: "Email id is already exist choose another.", email });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ ...user, password: hashPassword });
    const token = jwt.sign({ id: newUser._id, username }, jwtSecret, {
      expiresIn: "15d",
    });
    await newUser.save();
    const isAdmin = newUser.isAdmin;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User Created Successfully, Now Login",
      user: newUser,
      token,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }
    console.error("error : ", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const logUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username });
    if (!existUser) {
      return res
        .status(400)
        .json({ error: "User not exist with this credentials", username });
    }
    const isMatchPassword = await bcrypt.compare(password, existUser.password);
    if (!isMatchPassword) {
      return res.status(400).json({ error: "password not matched", password });
    }
    const token = jwt.sign({ id: existUser._id, username }, jwtSecret, {
      expiresIn: "15d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Fetched Successfully",
      user: existUser,
      token,
    });
  } catch (error) {
    console.error("Error : ", error.message);
    return res.status(500).json({ error: error, message: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    console.log("logging out user ");
    res.cookie("token", "", { maxAge: 0, path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in loggout : ", error.message);
    throw error;
  }
};

const getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.status(200).json({ user: req.user });
};

module.exports = { createUser, logUser, logoutUser, getMe };
