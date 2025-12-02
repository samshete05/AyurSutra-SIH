// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PatientProtectedRoute = ({ allowedRole, children }) => {
  const role = localStorage.getItem("role");

  if (role === allowedRole) {
    return children;
  } else {
    return <Navigate to="/NotFound" replace />;
  }
};

export default PatientProtectedRoute;
