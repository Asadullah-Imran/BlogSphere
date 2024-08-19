// src/pages/SinglePost.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addComment,
  addOrRemoveReaction,
  getComments,
  getPostById,
  getReactions,
} from "../services/postServices";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getComments(id);
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    const fetchReactions = async () => {
      try {
        const response = await getReactions(id);
        setReactions(response.data.data);
      } catch (error) {
        console.error("Error fetching reactions:", error.message);
      }
    };

    fetchPost();
    fetchComments();
    fetchReactions();
  }, [id]);

  const handleAddComment = async () => {
    try {
      await addComment(id, { content: newComment });
      setNewComment("");
      const response = await getComments(id);
      setComments(response.data.data);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleAddOrRemoveReaction = async () => {
    try {
      await addOrRemoveReaction(id);
      const response = await getReactions(id);
      setReactions(response.data.data);
    } catch (error) {
      console.error("Error adding reaction:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-cusLightBG rounded-lg shadow-lg">
      {post && (
        <>
          <h1 className="text-5xl font-extrabold mb-6 text-center text-cusPrimaryColor">
            {post.title}
          </h1>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-lg mb-6"
          />
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            {post.content}
          </p>
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddOrRemoveReaction}
              className=" bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-cusSecondaryColor"
            >
              ❤️ Love
            </button>
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-cusPrimaryColor">
            Reactions
          </h2>
          <div className="flex items-center mb-8">
            <span className="text-2xl">❤️</span>
            <span className="ml-2 text-lg text-gray-700">
              {reactions.length} {reactions.length === 1 ? "Love" : "Loves"}
            </span>
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-cusPrimaryColor">
            Comments
          </h2>
          <ul className="space-y-4 mb-8">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  - {comment.author.fullname}
                </p>
              </li>
            ))}
          </ul>
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
              rows="3"
              placeholder="Add a comment..."
            />
            <button
              onClick={handleAddComment}
              className="w-full bg-cusPrimaryColor text-white px-4 py-2 rounded-lg mt-4 hover:bg-cusSecondaryColor transition duration-300"
            >
              Add Comment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
