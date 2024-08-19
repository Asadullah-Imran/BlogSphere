import Post from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
