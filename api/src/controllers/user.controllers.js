import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getPostsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  const posts = await Post.find({ author: userId });
  if (!posts) {
    conosle.log("No posts found for this user");
    throw new ApiError(404, "No posts found for this user");
  }
  console.log(posts);
  res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { fullname, email } = req.body;
  let profilePicUrl;

  // check if the user is authorized to update the profile
  if (req.user._id.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to update this user");
  }

  //Handle profile picture upload if a file is provided

  if (req.file) {
    const uploadResult = await uploadOnCloudinary(req.file.path);

    if (uploadResult) {
      console.log("Upload response is -->", uploadResult);
      profilePicUrl = uploadResult.secure_url;
    } else {
      throw new ApiError(500, "Failed to upload profile picture");
    }
  }

  //Find the user and update the fields

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { fullname, email, ...(profilePicUrl && { profilePic: profilePicUrl }) },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User Updated Successfully"));
});
