require('dotenv').config()
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const createUser = async (req, res) => {
  try {
    const user = req.body;
    const { username, email, password, firstname, lastname } = user;
    const foundByUsername = await User.findOne({ username });
    console.log("foundUser", foundByUsername);
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
    console.log("Mach password : ",isMatchPassword)
    if (!isMatchPassword) {
      return res.status(400).json({ error: "password not matched", password });
    }
    console.log("user : ",existUser)
    const token = jwt.sign({id: existUser._id,username}, jwtSecret, { expiresIn: "15d" });
    console.log("token : ",token)
    res.status(200).json({
      message: "User Fetched Successfully",
      user: existUser,
      token,
    });
  } catch (error) {
    console.error("Error : ",error.message)
    return res.status(500).json({ error: error, message: error.message });
  }
};

module.exports = { createUser, logUser };
