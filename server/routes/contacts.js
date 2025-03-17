import express from "express";
import { createContact, getContacts, updateContact, deleteContact } from "../controller/contacts.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected with requireSignIn middleware
router.post("/create", requireSignIn, createContact);
router.get("/all", requireSignIn, getContacts);
router.put("/update/:id", requireSignIn, updateContact);
router.delete("/delete/:id", requireSignIn, deleteContact);

export default router;
