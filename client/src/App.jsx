// src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/authContext";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import VerifyEmail from "./pages/VerifyEmail";
import WritePost from "./pages/WritePost";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <div className="min-h-screen bg-cusLightBG dark:bg-cusDarkBG transition-colors duration-300">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="posts" element={<Posts />} />
              <Route path="post/:id" element={<SinglePost />} />
              <Route
                path="create-post"
                element={<PrivateRoute element={<WritePost />} />}
              />
              <Route
                path="profile/:id"
                element={<PrivateRoute element={<Profile />} />}
              />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </AuthContextProvider>
  );
};

export default App;
