// src/components/BestBlogs.js
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight, FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getPosts } from "../services/postServices";
import SkeletonCard from "./SkeletonCard";

const BestBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        const allPosts = response.data.data;

        // Filter posts by most reactions and comments
        const sortedPosts = allPosts.sort((a, b) => {
          if (b.reactions.length === a.reactions.length) {
            return b.comments.length - a.comments.length;
          }
          return b.reactions.length - a.reactions.length;
        });

        setPosts(sortedPosts.slice(0, 7));
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Scroll left"
      >
        <FaChevronLeft className="text-cusPrimaryColor dark:text-cusSecondaryLightColor" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Scroll right"
      >
        <FaChevronRight className="text-cusPrimaryColor dark:text-cusSecondaryLightColor" />
      </button>

      {/* Carousel container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-4 gap-4 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72">
              <SkeletonCard />
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="flex-shrink-0 w-72 bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
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

              <div className="p-4 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-cusSecondaryLightColor text-cusDarkBG text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 bg-cusSecondaryLightColor text-cusDarkBG text-xs rounded">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <Link
                  to={`/post/${post._id}`}
                  className="mt-auto text-sm bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white py-1.5 px-4 rounded transition-colors text-center"
                >
                  Read Post
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-cusPrimaryColor dark:text-cusSecondaryColor">
              No trending posts found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestBlogs;
