import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import SkeletonLoader from "../Pages/SkeletonLoader";
import Footer from "../Pages/Home/Footer";
const Homelayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
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
      <Navbar theme={theme} setTheme={setTheme} />
      <Suspense fallback={<SkeletonLoader />}>
        <Outlet context={{ theme, setTheme }} />
      </Suspense>
      <Footer></Footer>
    </div>
  );
};

export default Homelayout;
