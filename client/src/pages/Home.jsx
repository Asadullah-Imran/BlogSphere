// src/pages/Home.js
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BestBlogs from "../components/BestBlogs";
import SkeletonCard from "../components/SkeletonCard";
import { getPosts } from "../services/postServices";
import { notify } from "../utils/notify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        const fetchedPosts = response.data.data;
        const lastTenPosts = fetchedPosts.slice(-10).reverse();
        setPosts(lastTenPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        notify("Failed to load posts", "failure");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    if (location.search.includes("source=login")) {
      notify("You have successfully logged in!", "success");
    }
  }, [location]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <ToastContainer />

      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-cusPrimaryColor to-cusSecondaryColor rounded-2xl p-4 sm:p-8 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Welcome to likhalikhi
          </h1>
          <p className="text-base sm:text-xl mb-6 max-w-2xl">
            Discover, share, and connect with a community of passionate writers
            and readers
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/posts"
              className="bg-white text-cusPrimaryColor hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Explore Posts
            </Link>
            <Link
              to="/create-post"
              className="bg-transparent border-2 border-white hover:bg-white/20 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </section>

      {/* Best Blogs Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor">
            Trending Blogs
          </h2>
          <Link
            to="/posts"
            className="text-cusPrimaryColor dark:text-cusSecondaryColor hover:underline"
          >
            View All
          </Link>
        </div>
        <BestBlogs />
      </section>

      {/* All Blogs Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor">
            Latest Posts
          </h2>
          <Link
            to="/posts"
            className="text-cusPrimaryColor dark:text-cusSecondaryColor hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 sm:h-48 object-cover"
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

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-cusSecondaryLightColor text-cusDarkBG text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-cusPrimaryColor dark:text-cusSecondaryColor mb-4 line-clamp-3 text-sm sm:text-base">
                    {post.content}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between items-center mt-auto gap-2">
                    <Link
                      to={`/profile/${post.author._id}`}
                      className="text-sm text-cusSecondaryColor font-medium hover:underline w-full sm:w-auto text-center"
                    >
                      by {post.author.fullname}
                    </Link>
                    <Link
                      to={`/post/${post._id}`}
                      className="text-sm bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white py-1.5 px-4 rounded transition-colors w-full sm:w-auto text-center"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-cusPrimaryColor dark:text-cusSecondaryColor">
                No posts available yet. Be the first to write one!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
