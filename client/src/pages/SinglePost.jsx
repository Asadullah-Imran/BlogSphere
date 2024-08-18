// src/pages/SinglePost.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addComment,
  addReaction,
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
  const [reactionType, setReactionType] = useState("");

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

  const handleAddReaction = async (type) => {
    try {
      await addReaction(id, { type });
      const response = await getReactions(id);
      setReactions(response.data.data);
    } catch (error) {
      console.error("Error adding reaction:", error.message);
    }
  };

  return (
    <div className="p-4">
      {post && (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <img
            src={post.image}
            alt={post.title}
            className="mb-4 w-full max-w-2xl"
          />
          <p className="text-lg mb-4">{post.content}</p>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleAddReaction("like")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Like
            </button>
            <button
              onClick={() => handleAddReaction("love")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Love
            </button>
            {/* Add other reaction buttons here */}
          </div>
          <h2 className="text-2xl font-semibold mb-2">Reactions:</h2>
          <ul className="list-disc pl-5 mb-4">
            {reactions.map((reaction) => (
              <li key={reaction._id}>
                {reaction.type} by {reaction.user.fullname}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Comments:</h2>
          <ul className="list-disc pl-5 mb-4">
            {comments.map((comment) => (
              <li key={comment._id}>
                {comment.content} - {comment.author.fullname}
              </li>
            ))}
          </ul>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Add a comment..."
            />
            <button
              onClick={handleAddComment}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
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
