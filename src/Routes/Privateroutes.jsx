import React, { use } from "react";
import { AuthContext } from "../Firebase/Context/AuthContext";
import { Navigate } from "react-router";
import Loader from "../Pages/Loader";
const Privateroutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  if (loading) {
    return <Loader></Loader>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default Privateroutes;
