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




