import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
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
      <Outlet></Outlet>
    </div>
  );
};

export default Homelayout;
