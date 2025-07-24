// src/components/BestBlogs.js
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {posts.length > 0 && (
        <>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-cusPrimaryColor text-white p-3 rounded-full shadow-md hover:bg-cusSecondaryColor transition-colors z-10"
            onClick={scrollLeft}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-cusPrimaryColor text-white p-3 rounded-full shadow-md hover:bg-cusSecondaryColor transition-colors z-10"
            onClick={scrollRight}
          >
            <FaChevronRight />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
      >
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex-none w-64 md:w-72">
              <SkeletonCard />
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-cusLightBG dark:bg-cusLightDarkBG p-4 rounded-xl shadow-md flex-none w-64 md:w-72 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <h3 className="text-lg font-bold text-cusPrimaryColor dark:text-cusSecondaryColor mb-2 line-clamp-2">
                {post.title}
              </h3>
              <Link
                to={`/post/${post._id}`}
                className="mt-2 inline-block py-2 px-4 bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white rounded-lg transition-colors text-center w-full"
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <div className="flex-none w-full text-center py-8">
            <p className="text-cusPrimaryColor dark:text-cusSecondaryColor">
              No trending posts available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestBlogs;
