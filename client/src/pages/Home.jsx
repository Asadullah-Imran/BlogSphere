// import React from 'react';

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-cusLightBG dark:bg-cusDarkBG min-h-screen text-cusPrimaryColor dark:text-cusSecondaryLightColor p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <button className="bg-cusPrimaryColor text-white p-2 rounded dark:bg-cusSecondaryColor">
          Menu
        </button>
      </header>

      <div className="grid gap-4">
        <div className="bg-white dark:bg-cusLightDarkBG p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Post Title</h2>
          <p className="text-gray-600 dark:text-cusSecondaryLightColor">
            Post excerpt goes here...
          </p>
          <Link
            to="/login"
            className="bg-cusPrimaryColor text-white p-2 rounded dark:bg-cusSecondaryColor"
          >
            Menu
          </Link>
        </div>
        {/* Add more post cards here */}
      </div>
    </div>
  );
};

export default HomePage;
