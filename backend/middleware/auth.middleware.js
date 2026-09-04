 import jwt from "jsonwebtoken";
 import User from "../model/user.model.js";
 
 // protect
 export const protect=async (req,res,next)=>{
    try {
        // console.log("Hello");
        let token;
        if(
            req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")
        ){
            token=req.headers.authorization.split(" ")[1];
        }
        if(!token)
        {
            return res.status(401).json({
                message:"Not authorized , token missing",
                success:false,
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password");
        if(!req.user)
        {
            return res.status(401).json({
                message:"User account no longer exists",
                success:false,
            });
        }
        if(req.user.isBlocked)
        {
            return res.status(403).json({
                message:"Your account has been blocked by admin.",
                success:false
            })
        }
        next();
    } 
    catch (err) {
        res.status(401).json({
            message:"Token invalid or expired",
            success:false,
        })    
    }
 }


 // role based authentication
export const authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!req.user || !roles.includes(req.user.role))
        {
            return res.status(403).json({
                message:"Access denied.You don't have permission.",
                success:false,
            })
        }
        next();
    }
}