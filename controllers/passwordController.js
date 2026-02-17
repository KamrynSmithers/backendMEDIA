import User from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Send reset email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    