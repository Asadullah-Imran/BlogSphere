import React, { createContext, useState } from "react";
import { login } from "../services/authenticationsServices.js";

// Create the authentication context
export const AuthContext = createContext();

// Create the authentication provider component
export const AuthContextProvider = ({ children }) => {
  // State to hold the authenticated user
  const [user, setUser] = useState(null);

  // Function to handle user login
  const loginWithContext = async (credentials) => {
    const res = await login(credentials);
    setUser(res.data.data.email);
    console.log("authcontext user set is :", res.data.data.email);
  };

  // Function to handle user logout
  const logoutWithContext = () => {
    // Perform logout logic here
    // Clear the authenticated user from the state
    setUser(null);
  };

  // Value object to be provided to consuming components
  const authContextValue = {
    user,
    loginWithContext,
    logoutWithContext,
  };

  // Render the authentication provider with the provided children
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
