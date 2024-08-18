import React, { useState } from "react";
import { createPost } from "../services/postServices";

const WritePost = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

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

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(selectedTags)); // Convert array to JSON string
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await createPost(formData);
      console.log("Post created successfully:", res);
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
    // Logic to handle form submission, such as sending data to the server
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-cusLightBG dark:bg-cusDarkBG rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-cusPrimaryColor">
        Create a New Post
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-cusPrimaryColor dark:text-cusSecondaryLightColor font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-cusLightDarkBG dark:text-cusSecondaryLightColor"
            placeholder="Enter the title of your post"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-cusPrimaryColor dark:text-cusSecondaryLightColor font-medium mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-cusLightDarkBG dark:text-cusSecondaryLightColor"
            rows="8"
            placeholder="Write your post content here..."
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-cusPrimaryColor dark:text-cusSecondaryLightColor font-medium mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-cusLightDarkBG dark:text-cusSecondaryLightColor"
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="block text-cusPrimaryColor dark:text-cusSecondaryLightColor font-medium mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {fixedTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full ${
                  selectedTags.includes(tag)
                    ? "bg-cusPrimaryColor text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-cusLightDarkBG dark:text-cusSecondaryLightColor"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-cusPrimaryColor text-white py-2 rounded-lg font-semibold hover:bg-cusSecondaryColor transition-colors"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default WritePost;
