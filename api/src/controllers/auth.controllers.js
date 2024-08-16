import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// export const register = async (req, res) => {
//   const { fullname, email, password } = req.body;

//   try {
//     const user = await User.create({
//       fullname,
//       email,
//       password,
//       verificationToken: crypto.randomBytes(32).toString("hex"),
//     });

//     //Send Verification mail

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subscribe: "Account Verification",
//       text: `Please click the link below to verify your account ${process.env.CLIENT_URL}/verify-email?id=${user._id}&token=${user.verificationToken}`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       success: true,
//       message:
//         "User created successfully. Please verify your email to activate your account.",
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

export const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiError(400, "Please fill all fields");
  }

  //check user already existed or not
  const exitedUser = await User.findOne({ email });
  if (exitedUser) {
    throw new ApiError(400, "User already existed with this email");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    verificationToken: crypto.randomBytes(32).toString("hex"),
  });

  //check user created or not

  if (!user) {
    throw new ApiError(400, "Failed to create user");
  }

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
    text: `Please click the link below to verify your account ${process.env.CLIENT_URL}/verify-email?id=${user._id}&token=${user.verificationToken}`,
  };

  await transporter.sendMail(mailOptions);

  // res.status(201).json({
  //   success: true,
  //   message:
  //     "User created successfully. Please verify your email to activate your account.",
  // });

  // finally send the response
  // const { verificationToken, password: userPassword, ...other } = user;
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        null,
        "User created successfully. Please verify your email to activate your account."
      )
    );
});

// verify email

export const verifyEmail = async (req, res) => {
  console.log("verifyEmail is calling");

  const { token, id } = req.query; // Extract token and id from query parameters
  console.log(`Token received: ${token}`);
  console.log(`User ID received: ${id}`);

  try {
    // Find user by ID
    const user = await User.findById(id);
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      console.log("User already verified");
      return res
        .status(200)
        .json({ success: true, message: "Email verified successfully" });
    }

    // Check if the verification token is valid and matches
    if (user.verificationToken && user.verificationToken === token) {
      // Verify the user and remove the token
      user.isVerified = true;
      user.verificationToken = undefined; // Removes the token
      await user.save();

      console.log("User verified and token removed");
      return res
        .status(200)
        .json({ success: true, message: "Email verified successfully" });
    } else {
      console.log("Invalid or expired token");
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }
  } catch (err) {
    console.log("Error occurred:", err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
