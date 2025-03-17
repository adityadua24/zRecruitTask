"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Initialize auth state from sessionStorage
  useEffect(() => {
    const data = sessionStorage.getItem("userID");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []); // Only run on mount

  // Keep sessionStorage in sync with auth state
  useEffect(() => {
    if (auth?.user?._id) {
      sessionStorage.setItem("userID", JSON.stringify({ user: auth.user, token: auth.token }));
    }
  }, [auth.user, auth.token]);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
