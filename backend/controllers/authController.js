import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const register = async (req, res) => {
    try {
        const { fullName, email, phone, password, role } = req.body;

        if (!fullName || !email || !phone || password || !role) {
            return res.json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({ email })

        if (user) {
            return res.json({
                success: false,
                message: "User already exist."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role
        })
        res.status(201).json({
            success: true,
            message: "Account created."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.json({
                success: false,
                message: "All fields are required."
            })
        }
        let user = await User.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: "Wrong email or password."
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password)



        if (!comparePassword) {
            return res.json({
                success: false,
                message: "Wrong email or password."
            })
        }

        //check role is correct or not
        if (role !== user.role) {
            return res.json({
                success: false,
                message: "Account not exist with current role."
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        res.status(200).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: `Welcome back ${user.fullName}`,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const logout = async (req, res) => {
    try {


        res.status(200).cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        }).json({
            success: true,
            message: "Logout Successfull.",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}






