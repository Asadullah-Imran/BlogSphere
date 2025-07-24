// src/pages/SinglePost.js
import { formatDistanceToNow } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import YouMayLike from "../components/YouMayLike";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postResponse = await getPostById(id);
        setPost(postResponse.data.data);

        const commentsResponse = await getComments(id);
        setComments(commentsResponse.data.data);

        const reactionsResponse = await getReactions(id);
        setReactions(reactionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

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
    if (!editedComment.trim()) return;

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

  // Check if user has reacted
  const hasReacted = reactions.some(
    (reaction) => reaction.user._id === user?._id
  );
  const reactionCount = reactions.length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 my-6">
        <div className="bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl shadow-lg p-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 my-6">
      {post && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl shadow-lg p-6">
            {/* Post Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center text-sm font-medium text-gray-500">
                    {post.author.fullname.charAt(0)}
                  </div>
                  <div>
                    <Link
                      to={`/profile/${post.author._id}`}
                      className="text-lg font-semibold text-cusPrimaryColor dark:text-cusSecondaryLightColor hover:underline"
                    >
                      {post.author.fullname}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={handleAddOrRemoveReaction}
                    className="flex items-center text-xl p-2 rounded-lg group"
                    title={hasReacted ? "Remove like" : "Like this post"}
                  >
                    {hasReacted ? (
                      <FaHeart className="text-red-500 transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <FaRegHeart className="text-cusPrimaryColor dark:text-cusSecondaryColor transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </button>
                  <span className="ml-1 text-lg text-cusPrimaryColor dark:text-cusSecondaryColor font-medium">
                    {reactionCount}
                  </span>
                </div>
              </div>

              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-lg mb-8"
              />
            </div>

            {/* Post Content */}
            <div className="prose max-w-none dark:prose-invert prose-lg mb-10">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Tags */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-3">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cusSecondaryLightColor dark:bg-gray-700 text-cusDarkBG dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-semibold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Comments ({comments.length})
              </h2>

              {/* Add Comment */}
              <div className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-xs font-medium text-gray-500">
                    {user ? user.fullname.charAt(0) : "U"}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full p-4 border dark:text-white border-gray-300 dark:border-gray-700 dark:bg-cusLightDarkBG rounded-lg focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
                      rows="3"
                      placeholder="Join the conversation..."
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddComment}
                  className="ml-12 bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white px-6 py-2 rounded-lg transition-colors"
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-white dark:bg-cusDarkBG p-5 rounded-lg shadow-md"
                    >
                      {editCommentId === comment._id ? (
                        <div className="mb-4">
                          <textarea
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            className="w-full p-4 border dark:text-white border-gray-300 dark:border-gray-700 dark:bg-cusLightDarkBG rounded-lg focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
                            rows="3"
                          />
                          <div className="flex justify-end gap-3 mt-3">
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
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                                {comment.author.fullname.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                                  {comment.author.fullname}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </p>
                              </div>
                            </div>

                            {user && comment.author._id === user._id && (
                              <div className="flex gap-3 text-gray-500 dark:text-gray-400">
                                <button
                                  onClick={() =>
                                    handleEditComment(
                                      comment._id,
                                      comment.content
                                    )
                                  }
                                  className="hover:text-cusPrimaryColor transition-colors"
                                  title="Edit comment"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => openModal(comment._id)}
                                  className="hover:text-red-500 transition-colors"
                                  title="Delete comment"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            )}
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 ml-11">
                            {comment.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-cusPrimaryColor dark:text-cusSecondaryColor">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* You May Like Sidebar */}
          <div className="w-full lg:w-80">
            <YouMayLike currentPostId={id} tags={post.tags} />
          </div>
        </div>
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
