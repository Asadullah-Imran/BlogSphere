import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BestBlogs from "../components/BestBlogs"; // Import the new component
import { getPosts } from "../services/postServices";

const Home = () => {
  const [blogs, setBlogs] = useState([]); // Define the 'blogs' state variable

  const location = useLocation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getPosts();
        setBlogs(response.data.data.slice(0, 10)); // Fetch only the first 10 posts
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchBlogs();
    const queryParams = new URLSearchParams(location.search);
    console.log("queryParams---> ", queryParams);
    if (queryParams.get("source") === "login") {
      console.log("User came by login");
    }
    console.log("location is---> ", location);
  }, []);

  return (
    <div className="p-4">
      {/* Best Blogs Section */}
      <BestBlogs />

      {/* All Blogs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              className={`flex flex-col md:flex-row md:items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              } bg-cusLightBG dark:bg-cusDarkBG p-4 rounded shadow-md`}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover mb-2 rounded md:w-60 md:h-40 md:mb-0 md:mr-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-cusPrimaryColor">
                  {blog.content.substring(0, 100)}...
                </p>
                <span className="text-cusSecondaryColor">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/post/${blog._id}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        {blogs.length === 10 && (
          <div className="mt-4">
            <Link to="/posts" className="text-blue-500 hover:underline">
              View All Posts
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
