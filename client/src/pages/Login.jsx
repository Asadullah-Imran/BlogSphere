import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authenticationsServices.js"; // Import the login service

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to handle error messages
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await login(formData); // Call the login service
      if (response.data.success) {
        localStorage.setItem("token", response.data.refreshToken); // Store JWT token
        // navigate("/"); // Redirect to homepage on success
        console.log("Login success");
        console.log(response.data);
      } else {
        setError(response.data.message); // Set error message
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-cusLightBG dark:bg-cusDarkBG min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-cusLightDarkBG p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded dark:bg-cusDarkBG border-cusPrimaryColor dark:border-cusSecondaryColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded dark:bg-cusDarkBG border-cusPrimaryColor dark:border-cusSecondaryColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-cusPrimaryColor text-white rounded hover:bg-opacity-90 dark:bg-cusSecondaryColor"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Logging in..." : "Login"}{" "}
            {/* Change button text while loading */}
          </button>
        </form>

        <p className="text-sm mt-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="text-cusSecondaryColor dark:text-cusSecondaryLightColor ml-1 underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
