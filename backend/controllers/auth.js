const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const createUser = async (req, res) => {
  try {
    const user = req.body;
    const { username, email, password } = user;
    const foundByUsername = await User.find({ username });
    const foundByEmail = await User.find({ email });

    if (foundByUsername) {
      res
        .status(400)
        .json({ error: "Username is already exist, choose another" });
    }
    if (foundByEmail) {
      res
        .status(400)
        .json({ error: "Email id is already exist choose another." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    password = hashPassword;
    const newUser = new User(user);
    const token = await jwt.sign(username, jwtSecret, { expiresIn: "15d" });
    await newUser.save();

    res
      .status(201)
      .json({
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

    res.status(500).json({ error: "Server error" });
  }
};

const logUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.find({ username });
    if (existUser) {
      const isMatchPassword = await bcrypt.compare(
        password,
        existUser.password
      );
      if (isMatchPassword) {
        const token = await jwt.sign(username, jwtSecret, { expiresIn: "15d" });
        res
          .status(200)
          .json({
            message: "User Fetched Successfully",
            user: existUser,
            token,
          });
      }
      res.status(400).json({ error: "password not matched" });
    }
    res.status(400).json({ error: "Username is not exist" });
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
};

module.exports = { createUser, logUser };
