import User from "../model/user.model.js"
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// to get user's profile
export const getProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id).select("-password");
        res.status(200).json({
            success:true,
            user,
        })
    } 
    catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

// to get public profile
export const getPublicProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id).select("name profilePic role createdAt");
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } 
    catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

// to update a profile
export const updateProfile=async(req,res)=>{
    try {
        const {name,phone,address,removeProfilePic}=req.body;
        const user=await User.findById(req.user._id);
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        //image handling
        if(req.file)
        {
            const result=await uploadToCloudinary(req.file.buffer,"profiles");
            user.profilePic=result.secure_url;   
        }
        else if(removeProfilePic==='true')
        {
            user.profilePic=null;
        }
        if(name!==undefined) user.name=name;
        if(phone!==undefined) user.phone=phone;
        if(address!==undefined) user.address=address;
        const updatedUser=await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.json({
            success:true,
            message:"Profile updated",
            user:userResponse,
        })
        
    } 
    catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}