// src/components/Sidebar.js
import PropTypes from "prop-types";
import React from "react";
import { FiBookOpen, FiEdit, FiHome, FiLogIn, FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = React.useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home", icon: <FiHome size={20} /> },
    { path: "/posts", label: "All Posts", icon: <FiBookOpen size={20} /> },
    ...(user
      ? [
          {
            path: "/create-post",
            label: "Write Post",
            icon: <FiEdit size={20} />,
          },
          {
            path: `/profile/${user._id}`,
            label: "Profile",
            icon: <FiUser size={20} />,
          },
        ]
      : []),
    { path: "/login", label: "Login", icon: <FiLogIn size={20} /> },
  ];

  return (
    <div
      className={`
        fixed md:sticky
        top-16 md:top-16
        left-0
        z-40
        w-64 min-w-[220px]
        bg-cusLightBG dark:bg-cusLightDarkBG
        shadow-lg
        transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        transition-transform duration-300 ease-in-out
        overflow-y-auto
        h-[calc(100vh-4rem)]
      `}
    >
      <div className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-cusPrimaryColor text-white"
                    : "text-cusPrimaryColor dark:text-cusSecondaryColor hover:bg-cusSecondaryLightColor/30 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-cusPrimaryColor dark:text-cusSecondaryColor mb-3">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Technology",
              "Design",
              "Travel",
              "Food",
              "Lifestyle",
              "Health",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-cusSecondaryLightColor/50 dark:bg-gray-700 text-cusDarkBG dark:text-white rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
