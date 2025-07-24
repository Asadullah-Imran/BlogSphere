import { useContext, useEffect, useState } from "react";
import {
  FaEdit,
  FaFileUpload,
  FaSave,
  FaTimes,
  FaTrash,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import SkeletonCard from "../components/SkeletonCard";
import { AuthContext } from "../context/authContext";
import { deletePost } from "../services/postServices";
import { getUserProfile, updateUserData } from "../services/userServices";

const Profile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const isCurrentUser = user && id === user._id;
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    bio: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [stats, setStats] = useState({ posts: 0, reactions: 0, comments: 0 });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const res = await getUserProfile(id);
        const userData = res.data.data;
        setProfileData({
          fullname: userData.fullname,
          email: userData.email,
          bio: userData.bio || "No bio yet",
        });

        // Calculate stats
        let totalReactions = 0;
        let totalComments = 0;

        userData.posts.forEach((post) => {
          totalReactions += post.reactions.length;
          totalComments += post.comments.length;
        });

        setStats({
          posts: userData.posts.length,
          reactions: totalReactions,
          comments: totalComments,
        });

        setPosts(userData.posts);
      } catch (error) {
        console.log("Failed to fetch Profile Data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [id, editMode]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5000000) {
      setProfilePic(file);
    } else {
      console.error("File is too large or not an image.");
    }
  };

  const handleSave = async () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("fullname", profileData.fullname);
    formData.append("bio", profileData.bio);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await updateUserData(id, formData);
      if (isCurrentUser) {
        setUser({
          ...user,
          profilePic: response.data.data.profilePic,
          fullname: response.data.data.fullname,
          bio: response.data.data.bio,
        });
      }
      setEditMode(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePost = (postId) => {
    setPostIdToDelete(postId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postIdToDelete);
      setPosts(posts.filter((post) => post._id !== postIdToDelete));
      setIsModalOpen(false);
      // Update stats
      setStats((prev) => ({ ...prev, posts: prev.posts - 1 }));
    } catch (err) {
      console.log("Failed to delete post: ", err);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-white dark:bg-cusLightDarkBG rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-cusPrimaryColor to-cusSecondaryColor h-32"></div>

        <div className="px-6 pb-8 -mt-16 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="relative group">
              {isLoading ? (
                <div className="bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-cusLightDarkBG rounded-full w-32 h-32" />
              ) : (
                <>
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="border-4 border-white dark:border-cusLightDarkBG rounded-full w-32 h-32 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-cusLightDarkBG rounded-full w-32 h-32 flex items-center justify-center">
                      <FaUserAlt className="text-5xl text-gray-400" />
                    </div>
                  )}

                  {editMode && (
                    <label className="absolute bottom-2 right-2 bg-white dark:bg-cusDarkBG p-2 rounded-full shadow-lg cursor-pointer group-hover:opacity-100 transition-opacity">
                      <FaFileUpload className="text-cusPrimaryColor dark:text-cusSecondaryColor" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </>
              )}
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              {isLoading ? (
                <>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <h1
                      className="text-3xl font-bold text-white dark:text-white"
                      style={{ textTransform: "capitalize" }}
                    >
                      {profileData.fullname}
                    </h1>

                    {isCurrentUser && !editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center px-4 py-2 bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white rounded-lg transition-colors"
                      >
                        <FaEdit className="mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {profileData.email}
                  </p>

                  <p className="mt-3 text-cusPrimaryColor dark:text-cusSecondaryColor">
                    {profileData.bio}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          {!isLoading && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-cusLightBG dark:bg-cusDarkBG p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                  {stats.posts}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Posts</div>
              </div>
              <div className="bg-cusLightBG dark:bg-cusDarkBG p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                  {stats.reactions}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Reactions
                </div>
              </div>
              <div className="bg-cusLightBG dark:bg-cusDarkBG p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                  {stats.comments}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Comments</div>
              </div>
            </div>
          )}

          {/* Edit Form */}
          {editMode && (
            <div className="mt-8 bg-cusLightBG dark:bg-cusDarkBG p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                Edit Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={profileData.fullname}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cusLightDarkBG text-cusPrimaryColor dark:text-cusSecondaryLightColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-cusLightDarkBG text-cusPrimaryColor dark:text-cusSecondaryLightColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
                    rows="3"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors flex items-center"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white rounded-lg transition-colors flex items-center"
                  >
                    {isUpdating ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Posts */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor">
            {isCurrentUser ? "Your Posts" : `Posts by ${profileData.fullname}`}
          </h2>
          {isCurrentUser && (
            <Link
              to="/create-post"
              className="px-4 py-2 bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white rounded-lg transition-colors flex items-center"
            >
              <FaEdit className="mr-2" />
              Create New Post
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-cusLightDarkBG rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-cusSecondaryLightColor text-cusDarkBG text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-cusPrimaryColor dark:text-cusSecondaryColor mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <span className="mr-4">❤️ {post.reactions.length}</span>
                      <span>💬 {post.comments.length}</span>
                    </div>
                    <span>
                      📖 {Math.ceil(post.content.length / 1000)} min read
                    </span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Link
                      to={`/post/${post._id}`}
                      className="flex-1 text-center py-2 px-4 bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white rounded-lg transition-colors"
                    >
                      Read More
                    </Link>

                    {isCurrentUser && (
                      <div className="flex gap-2">
                        <Link
                          to={`/create-post?postId=${post._id}`}
                          state={post}
                          className="p-2 bg-gray-200 dark:bg-gray-700 text-cusPrimaryColor dark:text-cusSecondaryLightColor rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          title="Edit post"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Delete post"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl p-10 text-center">
            <div className="text-5xl mb-4 text-gray-300 dark:text-gray-600">
              📝
            </div>
            <h3 className="text-xl font-semibold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-2">
              No posts yet
            </h3>
            <p className="text-cusPrimaryColor dark:text-cusSecondaryColor mb-6">
              {isCurrentUser
                ? "You haven't created any posts yet. Start sharing your thoughts!"
                : "This user hasn't published any posts yet."}
            </p>
            {isCurrentUser && (
              <Link
                to="/create-post"
                className="inline-block px-6 py-3 bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white rounded-lg transition-colors"
              >
                Create Your First Post
              </Link>
            )}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
};

export default Profile;
