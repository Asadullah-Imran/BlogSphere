// src/components/Footer.js
import React from "react";
import {
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cusLightBG dark:bg-cusDarkBG text-cusPrimaryColor dark:text-cusSecondaryColor py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-cusPrimaryColor dark:text-cusSecondaryColor">
              likhalikhi
            </h3>
            <p className="text-sm mb-4">
              A platform to share your thoughts, ideas, and stories. Connect
              with others and explore the world of likhalikhi!
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, url: "https://facebook.com" },
                { icon: <FaTwitter />, url: "https://twitter.com" },
                { icon: <FaInstagram />, url: "https://instagram.com" },
                { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cusPrimaryColor text-white p-2 rounded-full hover:bg-cusSecondaryColor transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "All Posts", "Write Post", "My Profile"].map(
                (link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sm hover:text-cusSecondaryLightColor transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                "Technology",
                "Design",
                "Travel",
                "Food",
                "Lifestyle",
                "Health",
              ].map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm hover:text-cusSecondaryLightColor transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-3">Subscribe to get the latest updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm rounded-l focus:outline-none w-full bg-white dark:bg-gray-800"
              />
              <button className="bg-cusPrimaryColor hover:bg-cusSecondaryColor text-white px-4 py-2 rounded-r text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-cusSecondaryColor mb-4 md:mb-0">
            &copy; {currentYear} likhalikhi. All Rights Reserved.
          </div>
          <div className="flex items-center text-sm">
            <span>Made with</span>
            <FaHeart className="text-red-500 mx-1" />
            <span>by Asadullah Imran</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
