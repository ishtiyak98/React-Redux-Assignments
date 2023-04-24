import React from "react";
import { Navigate } from "react-router-dom";
import useLoggedUser from "../../hooks/useLoggedUser";

const AdminProtected = ({ children }) => {
  const isLoggedIn = useLoggedUser();
  // const isLoggedIn = useAuthCheck();


  // return isLoggedIn?.role === "admin" ? children : <Navigate to="/" />;
  return isLoggedIn?.role === "admin" ? children : <Navigate to="/admin" />;
};

export default AdminProtected;
