import { motion } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { use } from "react";
import { AuthContext } from "../../Firebase/Context/AuthContext";
import { useOutletContext } from "react-router";
const AddBook = () => {
  const { user, token } = use(AuthContext);
  const { theme } = useOutletContext();
  let handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const allbook = Object.fromEntries(formdata.entries());

    allbook.user_email = user?.email;
    allbook.user_name = user?.displayName;
    allbook.upvote = 0;
    //send data to db
    axios
      .post(
        "https://virtual-bookshelf-server-sooty.vercel.app/add-book",
        allbook,
        {
          headers: {
            Authorization: `Bearer ${token}`, //  Send token in header
          },
        }
      )
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Items Added",
            draggable: true,
          });
        }
      });
  };
  return (
    <div className="min-h-screen  py-20 px-4">
      <motion.div
        className="container mx-auto rounded-2xl p-8 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-indigo-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex justify-center items-center mb-4 gap-2">
          <img className="w-10 mb-2" src="/assets/book.png" alt="Book Icon" />
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Add a New Book
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
            className={`input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 ${
              theme
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-600 cursor-not-allowed"
            }`}
            required
          />

          <input
            type="text"
            name="cover_photo"
            placeholder="🖼️ Cover Photo URL"
            className={`input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 ${
              theme
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-600 cursor-not-allowed"
            }`}
            required
          />

          <input
            type="number"
            name="total_page"
            placeholder="📄 Total Pages"
            className={`input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 ${
              theme
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-600 cursor-not-allowed"
            }`}
            required
          />

          <input
            type="text"
            name="book_author"
            placeholder="✍️ Author Name"
            className={`input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 ${
              theme
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-600 cursor-not-allowed"
            }`}
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
            className={`input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 ${
              theme
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-600 cursor-not-allowed"
            }`}
            required
          >
            <option value="">📚 Choose Category</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Fantasy</option>
          </select>

          <select
            name="reading_status"
            className={`input input-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 ${
              theme
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-600 cursor-not-allowed"
            }`}
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
            className={`textarea textarea-bordered w-full rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 ${
              theme
                ? "bg-gray-100 text-gray-600"
                : "bg-gray-100 text-gray-600 cursor-not-allowed"
            }`}
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

export default AddBook;
