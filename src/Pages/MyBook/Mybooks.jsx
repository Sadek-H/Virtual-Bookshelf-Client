import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../../Firebase/Context/AuthContext";
import { FaTrashAlt, FaEdit, FaBookReader } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import SkeletonLoader from "../SkeletonLoader";
import { useOutletContext } from "react-router";

const Mybooks = () => {
  const { user, token } = use(AuthContext);
  const { theme } = useOutletContext();

  // Define isDark for easy checks
  const isDark = theme === "dark" || theme === true;

  const [mybook, setMybook] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    fetch("https://virtual-bookshelf-server-sooty.vercel.app/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let filteredData = data.filter((D) => D?.user_email === user?.email);
        setMybook(filteredData);
        setLoader(false);
      });
  }, [user, token]);

  if (loader) {
    return <SkeletonLoader />;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://virtual-bookshelf-server-sooty.vercel.app/books/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount) {
              setMybook((prevBooks) => prevBooks.filter((book) => book._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your book has been deleted.",
                icon: "success",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the book.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div
      className={`min-h-screen px-4 md:px-16 py-25 ${
        isDark ? "bg-gray-900 text-gray-300" : "bg-gradient-to-b from-white to-blue-50 text-gray-900"
      }`}
    >
      <div className="flex justify-center items-center gap-2 mb-8">
        {mybook.length === 0 ? (
          <p></p>
        ) : (
          <>
            <h2 className={`${isDark ? "text-blue-400" : "text-blue-900"} text-3xl font-extrabold`}>
              My Bookshelf
            </h2>
            <FaBookReader className={`${isDark ? "text-blue-400" : "text-blue-900"} text-3xl`} />
          </>
        )}
      </div>

      {mybook.length === 0 ? (
        <div className={`flex justify-center items-center py-14`}>
          <div
            className={`${
              isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-blue-50 border-blue-200 text-blue-700"
            } border rounded-xl p-8 text-center max-w-md`}
          >
            <h3 className="text-2xl font-bold mb-2">No Books Added</h3>
            <p className="mb-4">
              You haven't added any books to your shelf yet.
            </p>
            <Link
              to="/add-book"
              className={`inline-block ${
                isDark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              } px-6 py-2 rounded-full font-semibold transition`}
            >
              Add Your First Book
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Table view for medium and larger devices */}
          <div
            className={`container mx-auto hidden md:block overflow-x-auto rounded-xl shadow-xl ${
              isDark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
            }`}
          >
            <table className="min-w-full text-sm text-left table-auto">
              <thead
                className={`text-xs uppercase tracking-wider ${
                  isDark ? "bg-gray-700 text-gray-300" : "bg-blue-100 text-blue-800"
                }`}
              >
                <tr>
                  <th className="px-6 py-4">Cover</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Upvotes</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={`${isDark ? "divide-gray-700" : "divide-gray-200"} divide-y`}>
                {mybook.map((book) => (
                  <tr
                    key={book._id}
                    className={`hover: ${
                      isDark ? "bg-gray-700" : "bg-blue-50"
                    } transition-all align-middle`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={book.cover_photo}
                        alt="Cover"
                        className="h-16 w-12 object-cover rounded shadow-sm border mx-auto"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold align-middle">
                      {book.book_title}
                    </td>
                    <td className="px-6 py-4 align-middle">{book.book_author}</td>
                    <td className="px-6 py-4 align-middle">
                      <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        {book.book_category}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-middle font-medium">
                      <span className="flex items-center gap-1">
                        <AiFillLike className="text-blue-500" /> {book.upvote}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center align-middle">
                      <div className="inline-flex gap-2">
                        <Link
                          to={`/mybook/update/${book._id}`}
                          className="flex items-center gap-1 btn btn-primary text-white text-xs rounded shadow"
                        >
                          <FaEdit /> Update
                        </Link>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded shadow"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for small devices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
            {mybook.map((book) => (
              <div
                key={book._id}
                className={`rounded-xl shadow-md p-4 flex flex-col ${
                  isDark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
                }`}
              >
                <img
                  src={book.cover_photo}
                  alt="Cover"
                  className="h-48 w-full object-cover rounded mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{book.book_title}</h3>
                <p className="text-sm mb-2">{book.book_author}</p>
                <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full w-fit mb-2">
                  {book.book_category}
                </span>
                <div className="flex items-center gap-1 text-sm mb-4">
                  <AiFillLike className="text-blue-500" /> {book.upvote}
                </div>
                <div className="mt-auto flex gap-2">
                  <Link
                    to={`/mybook/update/${book._id}`}
                    className="flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-1 text-xs rounded shadow w-full"
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-1 text-xs rounded shadow w-full"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Mybooks;
