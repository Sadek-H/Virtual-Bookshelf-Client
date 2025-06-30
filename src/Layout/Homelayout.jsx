import React, { Suspense } from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import SkeletonLoader from "../Pages/SkeletonLoader";
const Homelayout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar></Navbar>
      <Suspense fallback={<SkeletonLoader />}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
};

export default Homelayout;
