import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext.jsx";

import { Link } from "react-router-dom";
import { logout } from "../services/authenticationsServices.js";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  // console.log("user is: ", user);
  useEffect(() => {
    console.log("user in HomePage: ", user);
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res.data);
      // Redirect the user to the login page or home page after logging out
      console.log("Logout success");
      // window.location.href = "/login"; // Adjust the redirection path as needed
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show an error message to the user
    }
  };

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
            {user}
          </Link>
          <button
            onClick={handleLogout}
            className="bg-cusPrimaryColor text-white p-2 rounded dark:bg-cusSecondaryColor"
          >
            Logout
          </button>
        </div>
        {/* Add more post cards here */}
      </div>
    </div>
  );
};

export default HomePage;
