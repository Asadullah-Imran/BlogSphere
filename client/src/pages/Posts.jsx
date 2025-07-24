// src/pages/Posts.js
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";
import { getPosts } from "../services/postServices";

const fixedTags = [
  "Technology",
  "Health",
  "Travel",
  "Education",
  "Food",
  "Lifestyle",
  "Fashion",
  "Sports",
  "Entertainment",
  "Finance",
];

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Filter posts based on the selected tag
  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags
          .map((tag) => tag.toLowerCase())
          .includes(selectedTag.toLowerCase())
      )
    : posts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-4">
          Explore All Posts
        </h1>
        <p className="text-lg text-cusPrimaryColor dark:text-cusSecondaryColor max-w-2xl mx-auto">
          Discover stories, perspectives, and knowledge from our community of
          writers
        </p>
      </div>

      {/* Tag Filter Section */}
      <div className="mb-10">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-cusSecondaryColor">
            Filter by Tag:
          </h2>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag("")}
              className="text-sm bg-cusSecondaryColor text-white px-3 py-1 rounded-lg hover:bg-cusPrimaryColor transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {fixedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? "bg-cusPrimaryColor text-white shadow-md"
                  : "bg-cusSecondaryLightColor/50 dark:bg-gray-700 text-cusDarkBG dark:text-gray-300 hover:bg-cusSecondaryLightColor dark:hover:bg-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                  {format(new Date(post.createdAt), "MMM dd, yyyy")}
                </div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <div className="flex items-center gap-1 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                    <AiFillHeart /> {post.reactions.length}
                  </div>
                  <div className="flex items-center gap-1 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                    <FaRegComment /> {post.comments.length}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-2 py-1 bg-cusSecondaryLightColor text-cusDarkBG text-xs rounded cursor-pointer hover:bg-cusSecondaryColor hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-cusPrimaryColor dark:text-cusSecondaryColor mb-4 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/profile/${post.author._id}`}
                    className="text-sm text-cusSecondaryColor font-medium hover:underline"
                  >
                    by {post.author.fullname}
                  </Link>
                  <Link
                    to={`/post/${post._id}`}
                    className="text-sm bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white py-1.5 px-4 rounded transition-colors"
                  >
                    Read
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-4">
              No posts found
            </h3>
            <p className="text-cusPrimaryColor dark:text-cusSecondaryColor mb-6">
              We couldn't find any posts matching your filter. Try selecting a
              different tag.
            </p>
            <button
              onClick={() => setSelectedTag("")}
              className="bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
