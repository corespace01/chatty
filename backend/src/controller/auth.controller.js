import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, password, fullName} = req.body;
    try{

        if (!password || !email || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }

        if (password < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }

        const user = await User.findOne({email});
        if (user) return res.status(400).json({ message: "User already present"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email, 
            password: hashedPassword, 
            fullName
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                email:newUser.email,
                fullName:newUser.fullName
            });
        }else{
            res.status(400).json({ message: "Failed to create new user" });
        }

    }
    catch(error){
        console.log("Error in sign-up controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
    

}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
    
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({ message: "Invalid credentials"});

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword){
            return res.status(400).json({ message: "Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
            profilePic:user.profilePic
        });

    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const logout = (req, res) => {

    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfile = async (req, res) => {

    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {profilePic: uploadResponse.secure_url},
            {new: true}
        );

        res.status(200).json(updateUser);
    }catch(error){
        console.log("Error in update profile controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in check auth controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}