import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model";

export const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const user = await User.create({
      fullname,
      email,
      password,
      verificationToken: crypto.randomBytes(32).toString("hex"),
    });

    //Send Verification mail

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
      subscribe: "Account Verification",
      text: `Please click the link below to verify your account ${process.env.CLIENT_URL}/verify-email?token=${user.verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({
        success: true,
        message:
          "User created successfully. Please verify your email to activate your account.",
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
