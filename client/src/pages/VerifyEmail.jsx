import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false); // State to track if email is verified

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    const id = new URLSearchParams(location.search).get("id");

    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `/api/auth/verify-email?id=${id}&token=${token}`
        );
        setMessage(response.data.message);
        if (response.data.success) {
          setIsVerified(true); // Set isVerified to true if verification is successful
        }
      } catch (err) {
        setMessage("Verification failed. Please try again.");
      }
    };

    verifyToken();
  }, [location]);

  return (
    <div className="bg-cusLightBG dark:bg-cusDarkBG min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-cusLightDarkBG p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-center font-bold mb-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Email Verification
        </h2>
        <p className="mb-4 text-center text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          {message}
        </p>
        {isVerified && (
          <button
            onClick={() => navigate("/login")}
            className="w-full p-2 bg-cusPrimaryColor text-white rounded hover:bg-opacity-90 dark:bg-cusSecondaryColor"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
