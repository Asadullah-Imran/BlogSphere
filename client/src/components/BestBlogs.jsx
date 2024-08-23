import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getPosts } from "../services/postServices";

const BestBlogs = () => {
  const [posts, setPosts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        const allPosts = response.data.data;

        // Filter posts by most reactions and comments
        const sortedPosts = allPosts.sort((a, b) => {
          if (b.reactions.length === a.reactions.length) {
            return b.comments.length - a.comments.length;
          }
          return b.reactions.length - a.reactions.length;
        });

        // Select top 7 posts or random posts if none meet the criteria
        const bestPosts =
          sortedPosts.length > 0
            ? sortedPosts.slice(0, 7)
            : allPosts.slice(0, 7);
        setPosts(bestPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
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
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Best Blogs</h2>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </button>
        <div ref={scrollRef} className="flex overflow-x-auto space-x-4 pb-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-cusLightBG dark:bg-cusDarkBG p-4 rounded shadow-md flex-none w-60"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-cusPrimaryColor">{post.excerpt}</p>
              <span className="text-cusSecondaryColor">{post.date}</span>
              <Link
                to={`/post/${post._id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default BestBlogs;
