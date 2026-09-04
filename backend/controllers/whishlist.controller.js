import Property from "../model/property.model.js";
import Wishlist from "../model/wishlist.model.js";

// to add a property to wishlist
export const addWishlist=async(req,res)=>{
    try {
        const propertyId=req.params.propertyId;
        const propertyExists = await Property.findById(propertyId);
        if(!propertyExists)
        {
            return res.status(404).json({
                success:false,
                message:"Property not found"
            });
        }
        const existing=await Wishlist.findOne({
            user:req.user._id,
            property:propertyId
        });
        if(existing)
        {
            return res.status(200).json({
                success:true,
                message:"Already in wishlist"
            });
        }

        await Wishlist.create({
            user:req.user._id,
            property:propertyId
        })

        res.status(201).json({
            success:true,
            message:"Added to wishlist",
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })    
    }
}

// to get the wishlisten properties 
export const getWishlist=async(req,res)=>{
    try {
        const data=await Wishlist.find({ user:req.user._id }) .populate("property");
        const validData = data.filter(item => item.property != null);
        res.status(200).json(validData)
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })    
    }
}

// to remove from wihslist 
export const removeWishlist=async(req,res)=>{
    try {
        const propertyId=req.params.propertyId;
        const result=await Wishlist.findOneAndDelete({
            user:req.user._id,
            property:propertyId,
        })
        if(!result)
        {
            return res.status(404).json({
                success:false,
                message:"Wishlist item not found",
            });
        }

        res.status(200).json({
            success:true,
            message:"Removed from wishlist",
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })    
    }
}