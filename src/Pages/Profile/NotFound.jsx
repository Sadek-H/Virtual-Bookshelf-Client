import React from "react";
import { Link } from "react-router"
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <motion.div
          className="mb-6 shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/assets/page not found.jpg"
            alt="Page Not Found"
            className="w-1/2 mx-auto"
          />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-red-500 mb-4 mulish"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          404 - Page Not Found
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-6 mulish"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Link
            to="/"
            className="btn bg-green-600 text-white rounded-lg hover:bg-green-700 px-6 py-3 mulish transition duration-300"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
