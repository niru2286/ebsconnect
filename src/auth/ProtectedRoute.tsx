import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute: React.FC = () => {
  const auth = useContext(AuthContext);

  if (!auth?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
