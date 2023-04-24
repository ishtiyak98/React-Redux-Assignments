import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useLoggedUser from "../../hooks/useLoggedUser";

const PublicRoute = ({ children }) => {
  let location = useLocation();
  const isLoggedIn = useLoggedUser();

  return !isLoggedIn ? (
    children
  ) : isLoggedIn?.role === "student" ? (
    <Navigate to="/student/coursePlayer/1" state={{ from: location }} replace />
  ) : (
    <Navigate to="/admin/dashboard" state={{ from: location }} replace />
  );
};

export default PublicRoute;
