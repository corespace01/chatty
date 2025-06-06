import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorised: No Token provided"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decoded){
            return res.status(400).json({message : "Unauthorised: Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user){
            return res.status(400).json({message: "User not found"})
        }

        req.user = user;

        next();
        
    }catch(error){
        console.log("Error in protect route: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}