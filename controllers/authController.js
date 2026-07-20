const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/email");

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
          tokenVersion: emailExists.tokenVersion,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.status(200).json({
        message: "Login Successful!!",
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

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User don't exist with that ID.",
      });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "Current password and new password cannot be the same!!",
      });
    }
    const passwordMatched = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (passwordMatched) {
      user.password = newPassword;
      user.tokenVersion += 1;
      await user.save();
      res.status(200).json({
        message: "Your password has been changed successfully!!",
      });
    } else {
      res.status(401).json({
        message: "Sorry !! Your current password does not match!!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "No User With That Email!!",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.Click the link below.This link expires in 15 minutes.</p>.<a href="${resetUrl}">${resetUrl}</a>`,
    });
    res.status(200).json({
      message: "Password rest link sent to your email",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};




exports.resetPassword=async(req,res)=>{
  try {
   const {token}=req.params
  const {newPassword}=req.body
 const hashedToken=crypto.createHash('sha256').update(token).digest('hex')
  const user=await User.findOne({
    resetPasswordToken:hashedToken,
    resetPasswordExpires:{$gt:Date.now()}
  })
  if(!user){
    return res.status(404).json({
      message:"Token is already expired or invalid!!"
    })
  }
  user.password=newPassword
  user.resetPasswordExpires=undefined
  user.resetPasswordToken=undefined
  user.tokenVersion += 1;
  await user.save()
  res.status(200).json({
    message:"New Password Has Been Created Successfully!!"
  }) 
  } catch (error) {
   return res.status(400).json({
      error: error.message,
    }); 
  }
  
}