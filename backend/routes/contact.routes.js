import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js"
import { createContact, getAllContacts } from "../controllers/contact.controller.js";

const contactRouter=express.Router();

contactRouter.post("/",createContact);
contactRouter.get("/",protect,authorize("admin"),getAllContacts);

export default contactRouter;