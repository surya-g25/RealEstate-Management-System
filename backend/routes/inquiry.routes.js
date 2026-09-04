import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js"
import {getBuyerInquiries, getSellerInquiries, markAsRead, sendInquiry} from "../controllers/inquiry.controller.js"

const inquiryRouter=express.Router();

inquiryRouter.post("/",protect,authorize("buyer"),sendInquiry);
inquiryRouter.get("/seller",protect,authorize("seller"),getSellerInquiries);
inquiryRouter.get("/my",protect,authorize("buyer"),getBuyerInquiries);
inquiryRouter.get("/buyer",protect,authorize("buyer"),getBuyerInquiries);
inquiryRouter.get("/:id",protect,(req,res,next)=>{
    if (req.params.id === "my" || req.params.id === "buyer") {
        return getBuyerInquiries(req, res, next);
    }
    return getSellerInquiries(req, res, next);
});
inquiryRouter.patch("/:id/read",protect,markAsRead);

export default inquiryRouter;