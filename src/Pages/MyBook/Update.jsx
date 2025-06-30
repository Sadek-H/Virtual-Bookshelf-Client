import React, { use } from "react";
import { motion } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";
import { AuthContext } from "../../Firebase/Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
const Update = () => {
  //const data = useLoaderData();
  const { id } = useParams();
  const { user, token } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    let formdata = new FormData(form);
    let alldata = Object.fromEntries(formdata.entries());

    //update
    axios
      .put(`https://virtual-bookshelf-server-sooty.vercel.app/update/${id}`, alldata, {
        headers: {
          Authorization: `Bearer ${token}`, //  Send token in header
        },
      })
      .then((res) => {
        if (res.data?.modifiedCount) {
          Swal.fire({
            title: "Update Successful",
            icon: "success",
            confirmButtonText: "OK",
          });
          form.reset();
        }
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-white py-20 px-4">
      <motion.div
        className="max-w-3xl mx-auto rounded-2xl p-8 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-indigo-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex justify-center items-center mb-4 gap-2">
          <img className="w-10 mb-2" src="/assets/book.png" alt="Book Icon" />
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Update New Book
          </h2>
        </div>

        <p className="text-center text-gray-600 mb-8">
          Fill out the form to share a great read with the world!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="book_title"
            placeholder="📖 Book Title"
            className="input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="text"
            name="cover_photo"
            placeholder="🖼️ Cover Photo URL"
            className="input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="number"
            name="total_page"
            placeholder="📄 Total Pages"
            className="input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="text"
            name="book_author"
            placeholder="✍️ Author Name"
            className="input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 rounded-xl cursor-not-allowed text-gray-600"
          />

          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100 rounded-xl cursor-not-allowed text-gray-600"
          />

          <select
            name="book_category"
            className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">📚 Choose Category</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Fantasy</option>
          </select>

          <select
            name="reading_status"
            className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">📘 Reading Status</option>
            <option>Want-to-Read</option>
            <option>Reading</option>
            <option>Read</option>
          </select>

          <textarea
            name="book_overview"
            placeholder="📝 Write a short overview..."
            className="textarea textarea-bordered w-full rounded-xl focus:ring-2 focus:ring-purple-400"
            required
          ></textarea>

          <input
            type="number"
            value={0}
            readOnly
            placeholder="🔼 Upvote Count"
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed rounded-xl text-gray-600"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-600"
          >
            <div className="flex items-center justify-center gap-2">
              <IoIosAddCircle /> Add Book
            </div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Update;
