import React, {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GrFormNextLink } from "react-icons/gr";
import { BiSolidUpvote } from "react-icons/bi";
import { Link } from "react-router"
import { AuthContext } from "../../Firebase/Context/AuthContext";
const PopularBooks = () => {
  
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => {
        const sorting = data.sort((a,b)=> b.upvote-a.upvote).slice(0,6)
        setPopularBooks(sorting)});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-center text-indigo-500 font-semibold">SHOP ONLINE</p>
      <h2 className="text-4xl font-bold text-center  mb-14">
         Popular Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {popularBooks.map((book) => (
          <motion.div
            key={book._id}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="w-full h-[200px] bg-gray-50 flex items-center justify-center px-6">
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="max-h-full object-contain drop-shadow-md p-3"
              />
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-gray-800">
                {book.book_title}
              </h3>
              <p className="text-sm text-gray-500">by {book.book_author}</p>
              <p className="inline-block text-xs font-semibold text-white bg-indigo-500 px-3 py-1 rounded-full">
                {book.book_category}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                
               <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                   {book.upvote} upvotes  <BiSolidUpvote className="inline-block mb-1" />
               </span>
                <div className="flex items-center gap-2">
                  <Link to={`/books/${book._id}`} className="text-sm text-indigo-600 font-medium hover:underline transition">
                  View Details 
                </Link>
                <GrFormNextLink />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;
