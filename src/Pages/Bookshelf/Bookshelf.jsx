import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 
import { AiFillLike } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import SkeletonLoader from "../SkeletonLoader";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [filterstatus, setFilterStatus] = useState("All");
  const [text, setText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true);
    fetch("https://virtual-bookshelf-server-sooty.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false); // Set loading false after data is fetched
      });
  }, []);

  useEffect(() => {
    // Filter books by search text and status
    let filteredData = books.filter(
      (book) =>
        book?.book_title.toLowerCase().includes(text.toLowerCase()) ||
        book?.book_author.toLowerCase().includes(text.toLowerCase())
    );
    if (filterstatus !== "All") {
      filteredData = filteredData.filter(
        (book) => book.reading_status === filterstatus
      );
    }
    setFilteredBooks(filteredData);
  }, [books, text, filterstatus]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Show skeleton loader while loading
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-30">
      {/* Search & Filter */}
      <div className="flex justify-center items-center gap-6 flex-wrap md:flex-nowrap mb-10">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/2 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Search by title or author..."
            className="bg-transparent w-full px-2 py-1 outline-none"
          />
          <FaSearch className="text-pink-500" />
        </div>

        {/* Dropdown */}
        <div className="relative w-full md:w-1/4">
          <select
            onChange={handleStatusChange}
            value={filterstatus}
            className="w-full px-6 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 appearance-none shadow-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Read">Read</option>
            <option value="Reading">Reading</option>
            <option value="Want-to-Read">Want-to-Read</option>
          </select>
          <IoIosArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="shadow-xl rounded-3xl overflow-hidden group relative"
          >
            {/* Book Cover */}
            <div className="overflow-hidden h-64">
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="object-contain w-full h-full group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Book Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-bold truncate">
                {book.book_title}
              </h3>
              <p className="text-sm text-gray-600 italic">
                by {book.book_author}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  {book.book_category}
                </span>
                <div className="flex items-center gap-1">
                  <AiFillLike className="text-green-400" />
                  <span className="text-sm text-green-600 font-semibold">
                    {book.upvote}
                  </span>
                </div>
              </div>

              <Link
                to={`/books/${book._id}`}
                className="block text-right text-blue-500 hover:underline mt-2 text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;