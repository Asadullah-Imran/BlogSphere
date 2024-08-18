import Post from "../models/post.model.js";

import Comment from "../models/comment.model.js";
import Reaction from "../models/reaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new post
// export const createPost = async (req, res, next) => {
//   try {
//     const { title, content, tags } = req.body;
//     // const author = req.user._id; // Assuming user info is available in req.user
//     const author = "66c0af684ad4a052f2aaf590";
//     console.log("request . is ", req);
//     let image;
//     if (req.file && req.file.path) {
//       image = await uploadOnCloudinary(req.file.path);
//       if (!image) {
//         throw new ApiError(500, "Failed to upload image");
//       }
//     } else {
//       throw new ApiError(400, "Image is required");
//     }

//     console.log(image);
//     const post = new Post({
//       title,
//       content,
//       image,
//       tags,
//       author,
//     });

//     await post.save();
//     res.status(201).json({
//       success: true,
//       data: post,
//     });
//   } catch (error) {
//     next(new ApiError(400, "Failed to create post"));
//   }
// };

export const createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    // const author = "66c0af684ad4a052f2aaf590"; // Replace with dynamic author ID
    const author = req.user._id; // Assuming user info is available in req.user

    let image;
    if (req.file && req.file.path) {
      const uploadResponse = await uploadOnCloudinary(req.file.path);
      if (!uploadResponse) {
        throw new ApiError(500, "Failed to upload image");
      }
      image = uploadResponse.secure_url; // Save only the secure URL or other required field
    } else {
      throw new ApiError(400, "Image is required");
    }

    const post = new Post({
      title,
      content,
      image, // Save the secure URL of the uploaded image
      tags,
      author,
    });

    await post.save();
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Error in createPost:", error);
    next(new ApiError(400, "Failed to create post"));
  }
};

// Get all posts
export const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find().populate(
      "author",
      "fullname email profilePic"
    ); // Adjust as per your schema
    // .populate("comments")
    // .populate("reactions");
    if (!posts || posts.length === 0) {
      throw new ApiError(404, "No posts found");
    }
    res.json(new ApiResponse(200, posts, "Posts fetched successfully"));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch posts"));
  }
});

// Get a single post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "fullname email"
    );
    // .populate("comments")
    // .populate("reactions");

    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to fetch post"));
  }
};

// Update a post by ID
export const updatePost = async (req, res, next) => {
  try {
    const { title, content, image, tags } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image, tags },
      { new: true, runValidators: true }
    );

    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to update post"));
  }
};

// Delete a post by ID
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, "Failed to delete post"));
  }
};

// Get comments for a post
export const getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate(
      "author",
      "fullname"
    );
    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to fetch comments"));
  }
};

// Add a comment to a post
export const addCommentToPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = new Comment({
      content,
      author: req.user._id, // Assuming user info is available in req.user
      post: req.params.id,
    });

    await comment.save();
    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to add comment"));
  }
};

// Add a reaction to a post
export const addReactionToPost = async (req, res, next) => {
  try {
    const { type } = req.body;
    const existingReaction = await Reaction.findOne({
      post: req.params.id,
      user: req.user._id,
    });

    if (existingReaction) {
      return next(new ApiError(400, "User has already reacted to this post"));
    }

    const reaction = new Reaction({
      type,
      user: req.user._id, // Assuming user info is available in req.user
      post: req.params.id,
    });

    await reaction.save();
    res.status(201).json({
      success: true,
      data: reaction,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to add reaction"));
  }
};

// Get reactions for a post
export const getReactionsForPost = async (req, res, next) => {
  try {
    const reactions = await Reaction.find({ post: req.params.id }).populate(
      "user",
      "fullname"
    );
    res.status(200).json({
      success: true,
      data: reactions,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to fetch reactions"));
  }
};
