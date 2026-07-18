const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email Already Exists.Sign Up With Different Email !!",
      });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      message: "User Regsitered Successfully!!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      return res.status(401).json({
        message: "Email Is Not Registered.Please Register First!!",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      emailExists.password,
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          id: emailExists._id,
          role: emailExists.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.status(200).json({
        message: "Login Successful!! ",
        token: token,
        data: {
          _id: emailExists._id,
          name: emailExists.name,
          email: emailExists.email,
          role: emailExists.role,
        },
      });
    } else {
      res.status(401).json({
        message: "Invalid Email And Password!!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
