import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
        status: 400,
      });
    }

    const checkUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User saved successfully",
      data: newUser,
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json(errorHandler(500, "Internal Server Error"));
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password is missing",
        status: 400,
      });
    }

    const checkUser = await User.findOne({ username });

    if (!checkUser) {
      return res.status(404).json({
        message: "Username not found",
        status: 404,
      });
    }

    const isPwdValid = await bcrypt.compare(password, checkUser.password);

    if (!isPwdValid) {
      return res.status(401).json({
        message: "Incorrect Password",
        status: 401,
      });
    } else {
      const token = jwt.sign({ id: checkUser._id }, process.env.SECRET);
      console.log(token);
      const { password: pass, ...rest } = checkUser._doc; // the doc is the property given by mongoose
      console.log(checkUser._doc)

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          message: "Sign in successful",
          userDetails: rest,
          token,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(errorHandler(500, "Internal Server Error"));
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      console.log(token);
      const { password:pass, ...rest } = user._doc;
      res
        .cookie("acess token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username:req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("acess token", token, { httpOnly: true })
        .status(200)
        .json(rest);
      res;
    }
  } catch (error) {
    console.log("internal server error from google",error);
  }
};
