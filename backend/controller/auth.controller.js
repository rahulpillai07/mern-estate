import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input fields (you can customize this based on your requirements)
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields', status: 400 });
        }

        // Check if the user with the provided email already exists
        const checkUser = await User.findOne({ email: email });

        if (checkUser) {
            return res.status(400).json({ message: 'User already exists', status: 400 });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User saved successfully');

        return res.status(200).json({
            message: `User saved successfully`,
            data: newUser,
            status: 200
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
};
