import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import token from "jsonwebtoken";

// user register---------------------
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
        return res.json({ msg: "User Account  created successfully", success: true, data })

    } catch (error) {

        return res.json({ msg: "Error in creating user Account", success: false, error: message })
    }
}

//User login---------------------------------------------------
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

        // check user role --------
        if (role != user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role.", success: false })
        }

        // create token for expire your login in given time--------- 
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRATE_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        //create cookie to store token for security purpose--
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.name}`, user, success: true
        })

    } catch (error) {
        return res.status(201).json({ message: "Error in login", success: false, error: message })
    }
}


