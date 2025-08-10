import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { AiFillLike } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import SkeletonLoader from "../SkeletonLoader";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [filterstatus, setFilterStatus] = useState("All");
  const [text, setText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    fetch("https://virtual-bookshelf-server-sooty.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
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
    setCurrentPage(1); // Reset to first page after filter/search change
  }, [books, text, filterstatus]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-30">
      {/* Search & Filter */}
      <div className="flex justify-center items-center gap-6 flex-wrap md:flex-nowrap mb-10">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/2 rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Search by title or author..."
            className="w-full px-2 py-1 outline-none focus:ring-0 focus:border-transparent"
          />
          <FaSearch className="text-pink-500" />
        </div>

        {/* Dropdown */}
        <div className="relative w-full md:w-1/4">
          <select
            onChange={handleStatusChange}
            value={filterstatus}
            className="w-full px-6 py-3 rounded-full focus:outline-none focus:ring-2 shadow-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Read">Read</option>
            <option value="Reading">Reading</option>
            <option value="Want-to-Read">Want-to-Read</option>
          </select>
        </div>
      </div>

      {/* Book Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentBooks.map((book) => (
          <div
            key={book._id}
            className="shadow-xl bg-gray-50 rounded-3xl overflow-hidden group relative"
          >
            {/* Book Cover */}
            <div className="overflow-hidden h-64">
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="object-fit w-full h-full group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Book Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-bold truncate text-gray-700">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
          type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-blue-700 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
            type="button"
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-400 text-gray-600"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
          type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-blue-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
