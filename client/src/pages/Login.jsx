// src/pages/Login.js
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/authContext.jsx";
import { notify } from "../utils/notify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithContext } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginWithContext(formData);
      if (response.data.success) {
        notify(response?.data?.message, "info");
        navigate("/?source=login");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      if (err?.response?.data?.message && err?.response?.status === 401) {
        notify(err?.response?.data?.message, "info");
      } else {
        notify(err?.response?.data?.message, "failure");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cusLightBG dark:bg-cusDarkBG flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-3">
            Welcome Back
          </h1>
          <p className="text-cusPrimaryColor dark:text-cusSecondaryColor">
            Sign in to continue your journey
          </p>
        </div>

        <div className="bg-white dark:bg-cusLightDarkBG rounded-2xl shadow-xl p-8">
          <ToastContainer />

          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-cusPrimaryColor to-cusSecondaryColor w-16 h-16 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-cusPrimaryColor dark:text-cusSecondaryLightColor">
            Login to Your Account
          </h2>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-cusDarkBG text-cusPrimaryColor dark:text-cusSecondaryLightColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-cusDarkBG text-cusPrimaryColor dark:text-cusSecondaryLightColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor focus:border-transparent transition-all"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              {/* Removed Remember me and Forgot password options */}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-cusPrimaryColor to-cusSecondaryColor text-white font-medium rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cusPrimaryColor/20 dark:shadow-cusSecondaryColor/20 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8">
            {/* Removed Or continue with and social login buttons */}
          </div>

          <p className="mt-8 text-center text-sm text-cusPrimaryColor dark:text-cusSecondaryLightColor">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-cusSecondaryColor dark:text-cusSecondaryLightColor hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
