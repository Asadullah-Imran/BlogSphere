import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const notify = (text) => toast(text);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await register(formData);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("Form submitted");
    notify("Form submitted");
    console.log(formData);
  };

  return (
    <div className="bg-cusLightBG dark:bg-cusDarkBG min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-cusLightDarkBG p-6 rounded-lg shadow-md w-full max-w-md">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-cusDarkBG border-cusPrimaryColor dark:border-cusSecondaryColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
              placeholder="Enter your fullname"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
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
              name="password"
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-cusDarkBG border-cusPrimaryColor dark:border-cusSecondaryColor focus:outline-none focus:ring-2 focus:ring-cusPrimaryColor"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-cusPrimaryColor text-white rounded hover:bg-opacity-90 dark:bg-cusSecondaryColor"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Already have an account?
          <Link
            href="/login"
            className="text-cusSecondaryColor dark:text-cusSecondaryLightColor ml-1 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
