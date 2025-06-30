import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../../Firebase/Context/AuthContext";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import SkeletonLoader from "../SkeletonLoader";

const Mybooks = () => {
  const { user, token } = use(AuthContext);
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
          .delete(
            `https://virtual-bookshelf-server-sooty.vercel.app/books/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.data.deletedCount) {
              setMybook((prevBooks) =>
                prevBooks.filter((book) => book._id !== id)
              );
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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 md:px-16 py-10">
      <div className="flex justify-center items-center gap-2 mb-8">
        {mybook.length === 0 ? (
          <p className=""></p>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold text-blue-900">
              My Bookshelf
            </h2>

            <FaBookReader className="text-3xl text-blue-900" />
          </>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl shadow-xl bg-white">
        {mybook.length === 0 ? (
          <div className="flex justify-center items-center py-14">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8  text-center max-w-md">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">
                No Books Added
              </h3>
              <p className="text-gray-600 mb-4">
                You haven't added any books to your shelf yet.
              </p>
              <Link
                to="/add-book"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition"
              >
                Add Your First Book
              </Link>
            </div>
          </div>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-800 table-auto">
            <thead className="bg-blue-100 text-xs uppercase tracking-wider text-blue-800">
              <tr>
                <th className="px-6 py-4">Cover</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Upvotes</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mybook.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-blue-50 transition-all align-middle"
                >
                  {/* Cover */}
                  <td className="px-6 py-4">
                    <img
                      src={book.cover_photo}
                      alt="Cover"
                      className="h-16 w-12 object-cover rounded shadow-sm border mx-auto"
                    />
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4 font-semibold align-middle">
                    {book.book_title}
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 align-middle">{book.book_author}</td>

                  {/* Category */}
                  <td className="px-6 py-4 align-middle">
                    <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      {book.book_category}
                    </span>
                  </td>

                  {/* Upvote */}
                  <td className="px-6 py-4 align-middle font-medium">
                    <span className="flex items-center gap-1">
                      <AiFillLike className="text-blue-500" /> {book.upvote}
                    </span>
                  </td>
                  {/* Actions */}
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
        )}
      </div>
    </div>
  );
};

export default Mybooks;
