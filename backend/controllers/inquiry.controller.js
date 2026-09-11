import Inquiry from "../model/inquiry.model.js";
import Property from "../model/property.model.js";
import mongoose from "mongoose";

//buyer send inquiry
export const sendInquiry=async(req,res)=>{
    try {
        const {propertyId,message}=req.body;
        if (!propertyId || !mongoose.isValidObjectId(propertyId)) {
            return res.status(400).json({
                success: false,
                message: "A valid property ID is required."
            });
        }
        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty."
            });
        }
        const property=await Property.findById(propertyId).populate("seller");
        if(!property)
        {
            return res.status(404).json({
                success:false,
                message:"Property not found."
            })
        }
        const sellerId = property.seller?._id || property.seller;
        if (!sellerId) {
            return res.status(400).json({
                success: false,
                message: "Property does not have an assigned seller."
            });
        }
        if (req.user._id.toString() === sellerId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot send an inquiry for your own property."
            });
        }
        const inquiry=await Inquiry.create({
            property:property._id,
            buyer:req.user._id,
            seller:sellerId,
            message,
        });

        res.status(201).json({
            success:true,
            status:true,
            message:"Inquiry sent successfully",
            inquiry,
        })
    } 
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })    
    }
}

// seller views inquiry
export const getSellerInquiries=async(req,res)=>{
    try {
        const inquiries=await Inquiry.find({seller:req.user._id})
                        .populate("buyer","name email phone")
                        .populate("property","title price images city")
                        .sort({ createdAt : -1 });
        res.json({
            success:true,
            count:inquiries.length,
            inquiries,
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })    
    }
}

// buyer views inquiry
export const getBuyerInquiries=async(req,res)=>{
    try {
        const inquiries=await Inquiry.find({buyer:req.user._id})
                        .populate("seller","name email phone")
                        .populate("property","title price images city")
                        .sort({ createdAt : -1 });
        res.json({
            success:true,
            count:inquiries.length,
            inquiries,
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })    
    }
}

// to mark inquiry as read
export const markAsRead=async(req,res)=>{
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }
        const inquiry=await Inquiry.findById(req.params.id);
        if(!inquiry)
        {
            return res.status(404).json({
                success:false,
                message:"Inquiry not found",
            })
        }
        const isRecipient = inquiry.seller?.toString() === req.user._id.toString() || req.user.role === "admin";
        if(!isRecipient)
        {
            return res.status(403).json({
                success:false,
                message:"Not authorized to update this inquiry"
            });
        }
        inquiry.isRead=true;
        await inquiry.save();
        
        res.json({
            success:true,
            message:"Marked as read",
            inquiry,
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })    
    }
}