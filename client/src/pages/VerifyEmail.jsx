// src/pages/VerifyEmail.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/authenticationsServices.js";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [icon, setIcon] = useState("loading");

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    const id = new URLSearchParams(location.search).get("id");

    const verifyToken = async () => {
      try {
        const response = await verifyEmail(id, token);
        setMessage(response.data.message);
        if (response.data.success) {
          setIsVerified(true);
          setIcon("success");
        } else {
          setIcon("error");
        }
      } catch (err) {
        setMessage("Verification failed. Please try again.");
        setIcon("error");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [location]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cusLightBG dark:bg-cusDarkBG flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-cusPrimaryColor"></div>
        <p className="mt-6 text-lg text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Verifying your email...
        </p>
      </div>
    );
  }

  const getIcon = () => {
    switch (icon) {
      case "success":
        return (
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <svg
              className="h-16 w-16 text-green-600 dark:text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <svg
              className="h-16 w-16 text-red-600 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <svg
              className="h-16 w-16 text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cusLightBG dark:bg-cusDarkBG flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-cusLightDarkBG rounded-2xl shadow-xl p-8">
        {getIcon()}

        <h2 className="text-2xl font-bold mb-4 text-center text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Email Verification
        </h2>

        <p className="mb-8 text-center text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          {message}
        </p>

        {isVerified ? (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 px-4 bg-gradient-to-r from-cusPrimaryColor to-cusSecondaryColor text-white font-medium rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cusPrimaryColor/20 dark:shadow-cusSecondaryColor/20"
          >
            Continue to Login
          </button>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 px-4 bg-gradient-to-r from-cusPrimaryColor to-cusSecondaryColor text-white font-medium rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cusPrimaryColor/20 dark:shadow-cusSecondaryColor/20"
            >
              Go to Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 text-cusPrimaryColor dark:text-cusSecondaryLightColor font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Create New Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
