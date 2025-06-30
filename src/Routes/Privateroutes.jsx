import React, { use } from "react";
import { AuthContext } from "../Firebase/Context/AuthContext";
import { Navigate } from "react-router";
import Loader from "../Pages/Loader";
import SkeletonLoader from "../Pages/SkeletonLoader";
const Privateroutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  if (loading) {
    return <SkeletonLoader/>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default Privateroutes;
