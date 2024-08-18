import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on the selected tag
  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags
          .map((tag) => tag.toLowerCase())
          .includes(selectedTag.toLowerCase())
      )
    : posts;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Tag:</h2>
        <div className="flex flex-wrap gap-2">
          {fixedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg ${
                selectedTag === tag
                  ? "bg-cusPrimaryColor text-white"
                  : "bg-cusSecondaryLightColor text-cusDarkBG"
              }`}
            >
              {tag}
            </button>
          ))}
          <button
            onClick={() => setSelectedTag("")}
            className="px-4 py-2 rounded-lg bg-cusSecondaryColor text-white"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {filteredPosts.map((post, index) => (
          <div
            key={post._id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-4 bg-cusLightBG p-6 rounded-lg`}
          >
            <div className="md:w-1/2">
              <img
                src={post.image}
                alt={post.title}
                className="max-w-96 max-h-96 h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-cusDarkBG">
                  {post.title}
                </h2>
                <p className="text-cusPrimaryColor mt-2">{post.content}</p>
                <p className="text-cusSecondaryColor mt-4">
                  Author: {post.author.fullname}
                </p>
              </div>
              <Link
                to={`/post/${post._id}`}
                className="mt-4 text-cusPrimaryColor underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
