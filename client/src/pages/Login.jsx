import React from "react";

const Login = () => {
  return (
    <div className="bg-cusLightBG dark:bg-cusDarkBG min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-cusLightDarkBG p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Login
        </h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded dark:bg-cusDarkBG border-cusPrimaryColor dark:border-cusSecondaryColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded dark:bg-cusDarkBG border-cusPrimaryColor dark:border-cusSecondaryColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-cusPrimaryColor text-white rounded hover:bg-opacity-90 dark:bg-cusSecondaryColor"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Don't have an account?
          <a
            href="/register"
            className="text-cusSecondaryColor dark:text-cusSecondaryLightColor ml-1 underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
