import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 1- user register================================================================================================
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        };
        // check user email can exit or not----------       
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exit with this email", success: false })
        }

        // encrypt the password with help of bcryptjs------------
        let salt = bcrypt.genSaltSync(10)// number digit provide password strongness
        const hashedPassword = await bcrypt.hash(password, salt)
        let data = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })
        return res.json({ message: "User Account  created successfully", success: true, data })

    } catch (error) {

        return res.json({ message: "Error in creating user Account", success: false, error: message })
    }
}

// 2-User login================================================================================================
export const login = async (req, res) => {
    try {
        // access email, password and role from the body---
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        };

        //check user email--------
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false })
        };

        //check user password------
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password", success: false })
        };

        // check user role correct or not--------
        if (role != user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role.", success: false })
        }

        // create token for expire your login in given time--------- 
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        //create cookie to store token, for security purpose--
        return res.status(200).cookie("tokenName", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`, user, success: true
        })

    } catch (error) {
        return res.status(201).json({ message: "Error in login", success: false, error: message })
    }
}

// 3- create user logout========================================================================================
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        return res.json({ message: "Error something", success: false, error: message })
        // console.log(error)  // you can write this code here
    }
}

// 4- update user profile=========================================================================================
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;// access file 

        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({ message: "Something is missing", success: false });
        // };

        let skillsArray;
        if (skillsArray) {
            skillsArray = skills.split(",")
        }

        const userId = req.id; // it comes from middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found.", success: false })
        }

        //update data--
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({ message: "Profile updated successfully.", user, success: true })

    } catch (error) {
        console.log(error)
    }
}
