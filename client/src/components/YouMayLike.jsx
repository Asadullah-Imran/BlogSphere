// src/components/YouMayLike.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularPosts, getRelatedPosts } from "../services/postServices";
import SkeletonCard from "./SkeletonCard";

const YouMayLike = ({ currentPostId, tags }) => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPosts();
  }, [tags, currentPostId]);

  return (
    <div className="bg-white dark:bg-cusDarkBG p-6 rounded-xl shadow-lg sticky top-6">
      <h3 className="text-xl font-bold mb-4 text-cusPrimaryColor border-b pb-3">
        You May Also Like
      </h3>

      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-16 h-16 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : recommendedPosts.length > 0 ? (
          recommendedPosts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="group flex items-center gap-3 p-3 rounded-lg hover:bg-cusLightBG dark:hover:bg-cusLightDarkBG transition-colors"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-cusPrimaryColor dark:text-cusSecondaryLightColor group-hover:text-cusSecondaryColor transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  by {post.author.fullname}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-cusPrimaryColor dark:text-cusSecondaryColor text-sm">
            No recommendations available
          </p>
        )}
      </div>
    </div>
  );
};

export default YouMayLike;
