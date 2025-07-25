// src/components/Navbar.js
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { FiLogOut, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/authContext";
import { logout } from "../services/authenticationsServices";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logoutWithContext } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    logoutWithContext();
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user && user._id) {
      navigate(`/profile/${user._id}`);
    }
  };

  const getDisplayName = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    return nameParts[0] || nameParts[nameParts.length - 1];
  };

  return (
    <nav className="bg-cusLightBG dark:bg-cusLightDarkBG px-4 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 text-cusPrimaryColor dark:text-cusSecondaryColor md:hidden"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-cusPrimaryColor dark:text-cusSecondaryColor tracking-tight"
        >
          <img
            src={logo}
            alt="likhalikhi Logo"
            className="h-8 w-8 object-contain"
          />
          <span>likhalikhi</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Navigation links removed as they are now only in the sidebar */}

        {user ? (
          <div className="flex items-center space-x-3">
            <div
              onClick={handleProfileClick}
              className="flex items-center cursor-pointer group"
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                {getDisplayName(user.fullname).charAt(0)}
              </div>
              <span className="ml-2 text-cusPrimaryColor dark:text-cusSecondaryColor group-hover:text-cusSecondaryLightColor transition-colors hidden md:block">
                {getDisplayName(user.fullname)}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="text-cusSecondaryColor dark:text-cusSecondaryColor hover:text-cusSecondaryLightColor transition-colors flex items-center"
              title="Logout"
            >
              <FiLogOut size={20} />
              <span className="ml-1 hidden md:inline">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white py-1.5 px-4 rounded-md transition-colors"
          >
            Login
          </button>
        )}

        <button
          onClick={toggleDarkMode}
          className="text-cusPrimaryColor dark:text-cusSecondaryColor hover:text-cusSecondaryLightColor transition-colors p-1.5 rounded-full bg-white/20 dark:bg-black/20"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Navbar;
