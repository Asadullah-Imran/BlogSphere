// src/components/SkeletonCard.js
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-cusLightBG dark:bg-cusLightDarkBG rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 h-48 w-full"></div>
      <div className="p-5">
        <div className="flex gap-2 mb-3">
          <div className="bg-gray-300 dark:bg-gray-700 h-6 w-16 rounded"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-6 w-16 rounded"></div>
        </div>

        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-4/6"></div>

        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
