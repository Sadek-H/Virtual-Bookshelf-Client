import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="mb-6 shadow-xl">
          <img
            src="/assets/page not found.jpg"
            alt="Page Not Found"
            className="w-1/2 mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-red-500 mb-4 mulish">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6 mulish">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="btn  bg-green-600 text-white rounded-lg hover:bg-green-700 px-6 py-3 mulish"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
