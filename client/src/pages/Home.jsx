// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

// Dummy data for all blogs
const blogs = [
  {
    id: 1,
    title: "Blog 1",
    excerpt: "This is the first blog.",
    date: "2024-08-01",
    image: "https://via.placeholder.com/300x200?text=Blog+1",
  },
  {
    id: 2,
    title: "Blog 2",
    excerpt: "This is the second blog.",
    date: "2024-08-02",
    image: "https://via.placeholder.com/300x200?text=Blog+2",
  },
  {
    id: 3,
    title: "Blog 3",
    excerpt: "This is the third blog.",
    date: "2024-08-03",
    image: "https://via.placeholder.com/300x200?text=Blog+3",
  },
  {
    id: 4,
    title: "Blog 4",
    excerpt: "This is the fourth blog.",
    date: "2024-08-04",
    image: "https://via.placeholder.com/300x200?text=Blog+4",
  },
];

// Dummy data for top blogs
const topBlogs = [
  {
    id: 1,
    title: "Top Blog 1",
    excerpt: "This is the top blog of the week.",
    date: "2024-08-01",
    image: "https://via.placeholder.com/300x200?text=Top+Blog+1",
  },
  {
    id: 2,
    title: "Top Blog 2",
    excerpt: "This is the second top blog.",
    date: "2024-08-02",
    image: "https://via.placeholder.com/300x200?text=Top+Blog+2",
  },
  {
    id: 3,
    title: "Top Blog 3",
    excerpt: "This is the third top blog.",
    date: "2024-08-03",
    image: "https://via.placeholder.com/300x200?text=Top+Blog+3",
  },
  {
    id: 4,
    title: "Top Blog 4",
    excerpt: "This is the fourth top blog.",
    date: "2024-08-04",
    image: "https://via.placeholder.com/300x200?text=Top+Blog+4",
  },
  {
    id: 5,
    title: "Top Blog 5",
    excerpt: "This is the fifth top blog.",
    date: "2024-08-05",
    image: "https://via.placeholder.com/300x200?text=Top+Blog+5",
  },
  {
    id: 6,
    title: "Top Blog 6",
    excerpt: "This is the sixth top blog.",
    date: "2024-08-06",
    image: "https://via.placeholder.com/300x200?text=Top+Blog+6",
  },
  {
    id: 7,
    title: "Top Blog 7",
    excerpt: "This is the seventh top blog.",
    date: "2024-08-07",
    image: "https://via.placeholder.com/300x200?text=Top+Blog+7",
  },
];

const Home = () => {
  return (
    <div className="p-4">
      {/* Top Blog Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Blogs</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {topBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-cusLightBG dark:bg-cusDarkBG p-4 rounded shadow-md flex-none w-60"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-cusPrimaryColor">{blog.excerpt}</p>
              <span className="text-cusSecondaryColor">{blog.date}</span>
              <Link
                to={`/post/${blog.id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* All Blogs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
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
                <p className="text-cusPrimaryColor">{blog.excerpt}</p>
                <span className="text-cusSecondaryColor">{blog.date}</span>
                <Link
                  to={`/post/${blog.id}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
