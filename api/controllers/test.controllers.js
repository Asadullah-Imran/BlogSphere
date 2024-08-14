// import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const user = await User.create({
      fullname,
      email,
      password,
      // verificationToken: crypto.randomBytes(32).toString("hex"),
      verificationToken: "adsnfkjh23io5hrwqio436h23kj5hntsdafoi943",
    });

    // Send Verification Email Asynchronously
    // sendVerificationEmail(user);

    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please verify your email to activate your account.",
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Separate function to handle email sending
const sendVerificationEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Account Verification", // Fixed typo here (from 'subscribe' to 'subject')
      text: `Please click the link below to verify your account ${process.env.CLIENT_URL}/verify-email?id=${user._id}&token=${user.verificationToken}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending verification email:", err);
    // Optionally: Retry logic or queue the email to be sent later
  }
};
export const getMessage = async (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the test route" });
};
