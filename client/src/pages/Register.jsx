// src/pages/Register.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  register,
  resendVerificationEmail,
} from "../services/authenticationsServices.js";
import { notify } from "../utils/notify";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [sentUserData, setSentUserData] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      // Calculate password strength
      let strength = 0;
      if (value.length > 5) strength += 1;
      if (value.length > 7) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await register(formData);
      if (response?.data?.success) {
        notify(response?.data?.message, "success");
        setIsRegistered(true);
        setSentUserData({ ...formData });
        setFormData({ fullname: "", email: "", password: "" });
        startTimer();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notify(error.response.data.message, "failure");
      } else {
        notify("An unexpected error occurred. Please try again.", "failure");
      }
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    setIsResendDisabled(true);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    try {
      const res = await resendVerificationEmail(sentUserData);
      notify(res.message, "success");
    } catch (error) {
      notify(error.message, "failure");
    }
    setTimer(30);
    startTimer();
    setIsResendDisabled(true);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength < 3) return "bg-red-500";
    if (passwordStrength < 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-cusLightBG dark:bg-cusDarkBG flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-3">
            Join Our Community
          </h1>
          <p className="text-cusPrimaryColor dark:text-cusSecondaryColor">
            Create your account to start your journey
          </p>
        </div>

        <div className="bg-white dark:bg-cusLightDarkBG rounded-2xl shadow-xl p-8">
          <ToastContainer />

          {!isRegistered ? (
            <>
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
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.03-.693-.082-1.021A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                Create Your Account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-cusDarkBG text-cusPrimaryColor dark:text-cusSecondaryLightColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor focus:border-transparent transition-all"
                      placeholder="John Doe"
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
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-cusDarkBG text-cusPrimaryColor dark:text-cusSecondaryLightColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor focus:border-transparent transition-all"
                      placeholder="your@email.com"
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
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-cusDarkBG text-cusPrimaryColor dark:text-cusSecondaryLightColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor focus:border-transparent transition-all"
                      placeholder="••••••••"
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

                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getPasswordStrengthColor()} transition-all duration-500`}
                        style={{ width: `${passwordStrength * 20}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {passwordStrength === 0 && "Enter a password"}
                      {passwordStrength > 0 &&
                        passwordStrength < 3 &&
                        "Weak password"}
                      {passwordStrength >= 3 &&
                        passwordStrength < 5 &&
                        "Medium strength"}
                      {passwordStrength >= 5 && "Strong password"}
                    </div>
                  </div>
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
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-cusSecondaryColor dark:text-cusSecondaryLightColor hover:underline"
                >
                  Login here
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg
                    className="h-8 w-8 text-green-600 dark:text-green-400"
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
              </div>

              <h2 className="text-2xl font-bold mb-3 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
                Check Your Email
              </h2>

              <p className="text-cusPrimaryColor dark:text-cusSecondaryLightColor mb-8">
                We've sent a verification link to your email address. Please
                check your inbox and follow the instructions to verify your
                account.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-6">
                <p className="text-blue-800 dark:text-blue-300">
                  Didn't receive the email? Check your spam folder or resend the
                  verification link.
                </p>
              </div>

              <button
                onClick={handleResend}
                disabled={isResendDisabled}
                className={`w-full py-3 px-4 font-medium rounded-xl transition-all ${
                  isResendDisabled
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cusPrimaryColor to-cusSecondaryColor text-white hover:opacity-90 shadow-lg shadow-cusPrimaryColor/20 dark:shadow-cusSecondaryColor/20"
                }`}
              >
                {isResendDisabled
                  ? `Resend in ${Math.floor(timer / 60)}:${
                      timer % 60 < 10 ? `0${timer % 60}` : timer % 60
                    }`
                  : "Resend Verification Link"}
              </button>

              <Link
                to="/login"
                className="mt-4 inline-block text-sm text-cusSecondaryColor dark:text-cusSecondaryLightColor hover:underline"
              >
                Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
