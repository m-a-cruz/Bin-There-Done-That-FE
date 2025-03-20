import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Replace this with your actual authentication logic
  return isAuthenticated ? children : <Navigate to="/bin-there-done-that/login" />;
};

export default AuthWrapper;
