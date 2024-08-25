import { format } from "date-fns"; // To format the date
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai"; // For love icon
import { FaRegComment } from "react-icons/fa"; // For comment icon
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

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

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
            className={`flex flex-col md:flex-row gap-4 bg-cusLightBG p-6 rounded-lg ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* First Section: Image with Overlapping Date, Reactions, and Comments */}
            <div className="relative md:w-1/3">
              <img
                src={post.image}
                alt={post.title}
                className="max-w-full h-auto rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-white bg-opacity-75 text-gray-700 text-xs px-2 py-1 rounded">
                {format(new Date(post.createdAt), "PPP")}
              </div>
              <div className="absolute bottom-2 left-2 flex gap-4 text-white">
                <div className="flex items-center gap-1 bg-black bg-opacity-50 px-2 py-1 rounded">
                  <AiFillHeart /> {post.reactions.length}
                </div>
                <div className="flex items-center gap-1 bg-black bg-opacity-50 px-2 py-1 rounded">
                  <FaRegComment /> {post.comments.length}
                </div>
              </div>
            </div>

            {/* Second Section: Title, Author, Content, Tags */}
            <div className="md:w-2/3 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-cusDarkBG">
                  {post.title}
                </h2>
                <p className="text-cusSecondaryColor mt-2">
                  by {post.author.fullname}
                </p>
                <p className="text-cusPrimaryColor mt-4">
                  {truncateText(post.content, 150)}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Tags:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      onClick={() => {
                        handleTagClick(tag);
                      }}
                      key={tag}
                      className="px-3 py-1 bg-cusSecondaryLightColor text-cusDarkBG  cursor-pointer rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/post/${post._id}`}
                className="mt-4 bg-cusPrimaryColor text-white py-2 px-4 rounded text-center w-32"
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
