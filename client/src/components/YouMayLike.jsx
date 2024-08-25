import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularPosts, getRelatedPosts } from "../services/postServices";

const YouMayLike = ({ currentPostId, tags }) => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        let relatedPosts = await getRelatedPosts(tags, currentPostId);

        if (relatedPosts.data.data.length < 5) {
          const popularPosts = await getPopularPosts(currentPostId);
          const combinedPosts = [
            ...relatedPosts.data.data,
            ...popularPosts.data.data,
          ];
          setRecommendedPosts(combinedPosts.slice(0, 5));
        } else {
          setRecommendedPosts(relatedPosts.data.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching recommended posts:", error.message);
      }
    };

    fetchRecommendedPosts();
  }, [tags, currentPostId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-2xl font-semibold mb-4 text-cusPrimaryColor">
        You May Like
      </h3>
      <ul className="space-y-4">
        {recommendedPosts.map((post) => (
          <li key={post._id}>
            <Link
              to={`/posts/${post._id}`}
              className="text-lg text-cusPrimaryColor hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.author.fullname}</p>
            <p className="text-sm text-gray-500">
              {post.reactions.length} Reactions
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouMayLike;
