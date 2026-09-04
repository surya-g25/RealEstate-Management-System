import User from "../model/user.model.js";
import Property from "../model/property.model.js";
import Inquiry from "../model/inquiry.model.js";

// view all users
export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find().select("-password");
        res.status(200).json({
            success:true,
            count:users.length,
            users,
        });
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// to block a particular user
export const blockUser=async(req,res)=>{
    try {
        if(req.user._id.toString() === req.params.id)
        {
            return res.status(400).json({
                success:false,
                message:"Administrators cannot block their own account."
            });
        }
        const user=await User.findById(req.params.id);
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found."
            });
        }
        user.isBlocked=!user.isBlocked;
        await user.save();

        res.json({
            success:true,
            message:user.isBlocked?"User is blocked":"User is unblocked",
            isBlocked:user.isBlocked,
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// to delete a particular user
export const deleteUser=async(req,res)=>{
    try {
        if(req.user._id.toString() === req.params.id)
        {
            return res.status(400).json({
                success:false,
                message:"Administrators cannot delete their own account."
            });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User not found."
            });
        }
        res.json({
            success:true,
            message:"User deleted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// to view all properties
export const getAllProperties=async(req,res)=>{
    try {
        const properties=await Property.find().populate("seller","name email");
        res.json({
            success:true,
            count:properties.length,
            properties
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// to delete a particular property
export const deleteProperty=async(req,res)=>{
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"Property deleted successfully."
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// to view all inquiries
export const getAllInquiries=async(req,res)=>{
    try {
        const inquiries=await Inquiry.find().populate("buyer","name email").populate("seller","name email").populate("property","title price").sort({ createdAt : -1 });

        res.json({
            success:true,
            count:inquiries.length,
            inquiries,
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// Dashboard analytics
export const getDashboardStats=async(req,res)=>{
    try {
        const totalUsers=await User.countDocuments();
        const totalProperties=await Property.countDocuments();
        const activeListings=await Property.countDocuments({status:"sale"});
        const soldProperties=await Property.countDocuments({status:"sold"});
        res.json({
            success:true,
            stats:{
                totalUsers,
                totalProperties,
                activeListings,
                soldProperties,
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// to get pending seller approvals
export const getPendingSeller=async(req,res)=>{
    try {
        const pendingSellers=await User.find({
            role:"seller",
            isApproved:false
        }).select("-password");
        
        res.json({
            success:true,
            count:pendingSellers.length,
            pendingSellers
        });
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

// to approve a seller 
export const approveSeller=async(req,res)=>{
    try {
        const seller=await User.findById(req.params.id);
        if(!seller || seller.role!=="seller")
        {
            return res.status(404).json({
                success:false,
                message:"Seller not found or user is not a seller"
            })
        }

        seller.isApproved=true;
        await seller.save();
        res.json({
            success:true,
            message:"Seller approved successfully",
            seller,
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}