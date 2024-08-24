// src/pages/SinglePost.js

import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { AuthContext } from "../context/authContext";
import {
  addComment,
  addOrRemoveReaction,
  deleteComment,
  getComments,
  getPostById,
  getReactions,
  updateComment,
} from "../services/postServices";
const SinglePost = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

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
  const handleEditComment = async (commentId, commentData) => {
    setEditCommentId(commentId);
    setEditedComment(commentData);
  };

  const handleUpdateComment = async () => {
    try {
      await updateComment(id, editCommentId, { content: editedComment });
      setEditCommentId(null);
      setEditedComment("");
      const response = await getComments(id);
      setComments(response.data.data);
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  const openModal = (commentId) => {
    setIsModalOpen(true);
    setCommentToDelete(commentId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCommentToDelete(null);
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(id, commentToDelete);
      const response = await getComments(id);
      setComments(response.data.data);
      closeModal();
    } catch (error) {
      console.error("Error deleting comment:", error.message);
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
          {/* <h2 className="text-3xl font-semibold mb-4 text-cusPrimaryColor">
            Comments
          </h2>
          <ul className="space-y-4 mb-8">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                {editCommentId === comment._id ? (
                  <>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
                      rows="3"
                    />
                    <button onClick={handleUpdateComment}>Update</button>
                    <button
                      onClick={() => {
                        setEditCommentId(null);
                        setEditedComment("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      - {comment.author.fullname}
                    </p>
                  </>
                )}
                {comment.author._id === user._id && (
                  <>
                    <FaEdit
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => {
                        handleEditComment(comment._id, comment.content);
                      }}
                    />
                    <FaTrashAlt
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => handleDeleteComment(comment._id)}
                    />
                  </>
                )}
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
          </div> */}
          <h2 className="text-3xl font-semibold mb-4 text-cusPrimaryColor">
            Comments
          </h2>
          <ul className="space-y-6 mb-8">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
              >
                {editCommentId === comment._id ? (
                  <>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
                      rows="3"
                    />
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={handleUpdateComment}
                        className="bg-cusPrimaryColor text-white px-4 py-2 rounded-lg hover:bg-cusSecondaryColor transition duration-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setEditCommentId(null);
                          setEditedComment("");
                        }}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-800 text-lg">
                          {comment.content}
                        </p>
                        <p className="text-sm text-gray-500">
                          - {comment.author.fullname}
                        </p>
                      </div>
                      {user && comment.author._id === user._id && (
                        <div className="flex gap-2 text-gray-500">
                          <FaEdit
                            className="cursor-pointer hover:text-cusPrimaryColor"
                            onClick={() =>
                              handleEditComment(comment._id, comment.content)
                            }
                          />
                          <FaTrashAlt
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => openModal(comment._id)}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="bg-white p-6 rounded-lg shadow-md">
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
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteComment}
        onCancel={closeModal}
      />
    </div>
  );
};

export default SinglePost;
