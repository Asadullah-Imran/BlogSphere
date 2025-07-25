// src/Layout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 transition-all duration-300 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
