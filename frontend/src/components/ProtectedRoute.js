import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, element: Component, ...props}) {
  return (
    isLoggedIn ? (<Component {...props} />) : (<Navigate to="/signin" replace/>)
  )
}

export default ProtectedRoute;