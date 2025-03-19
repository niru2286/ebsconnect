import React, { createContext, useState, useEffect } from "react";
import { getToken, isAuthenticated, login, logout } from "../services/authService"; 

interface AuthContextType {
  isLoggedIn: boolean;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const loginUser = async (username: string, password: string) => {

    const success = await login(username, password);
    if (success) {
      setIsLoggedIn(true);
    }
    return success;
  };

  const logoutUser = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
