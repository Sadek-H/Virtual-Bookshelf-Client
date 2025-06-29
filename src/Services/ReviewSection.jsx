import React, { use,  useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import { AuthContext } from "../Firebase/Context/AuthContext";

const ReviewSection = ({ bookId }) => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const { user,token } = use(AuthContext);

  // Load reviews for this book
  useEffect(() => {
    fetch("http://localhost:3000/reviews",{
      headers: {
          Authorization: `Bearer ${token}`, //  Send token in header
        },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((r) => r.bookId === bookId);
        setReviews(filtered);
      });
  }, [bookId,token]);

  // Submit review
  const handleClick = () => {
    if (reviews.some((rev) => rev.user?.email === user?.email)) {
      alert("You have already posted a review.");
      return;
    }

    const newReview = {
      bookId,
      text: review,
      user: {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };

    axios.post("http://localhost:3000/reviews", newReview,{
      headers: {
          Authorization: `Bearer ${token}`, //  Send token in header
        },
    }).then((res) => {
      setReviews([...reviews, { ...newReview, _id: res.data.insertedId }]);
      setReview("");
    });
  };

  // Update review
  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/review/${editId}`, { text: editText },{
        headers: {
          Authorization: `Bearer ${token}`, //  Send token in header
        },
      })
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          const updated = reviews.map((r) =>
            r._id === editId ? { ...r, text: editText } : r
          );
          setReviews(updated);
          document.getElementById("my_modal_5").close();
        }
      });
  };
  const handledelete = (id) => {
    axios.delete(`http://localhost:3000/review/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`, //  Send token in header
        },
    }).then((res) => {
      if (res.data.deletedCount) {
        const filteredData = reviews.filter((comment) => comment._id !== id);
        setReviews(filteredData);
      }
    });
  };
  return (
    <div>
      <div className="mb-6">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-3 border rounded"
          rows="3"
          placeholder="Write your review..."
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>

      {user ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 bg-gray-50 border rounded-lg shadow-sm flex items-start gap-4"
            >
              {review.user.photoURL ? (
                <img
                  src={review.user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-400" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">
                    {review.user.displayName || "Unknown"}
                  </h4>
                </div>
                <p className="text-gray-700 mt-1">{review.text}</p>
                {user?.email === review.user.email && (
                  <div className="flex gap-3 text-sm mt-2 text-blue-600">
                    <button
                      onClick={() => {
                        setEditId(review._id);
                        setEditText(review.text);
                        document.getElementById("my_modal_5").showModal();
                      }}
                      className="hover:underline flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => {
                        handledelete(review._id);
                      }}
                      className="hover:underline flex items-center gap-1 text-red-600"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 font-bold text-red-600 bg-amber-100 p-4 rounded-2xl shadow-md">
          <CgDanger className="text-2xl" />
          <p>Please log in to see and post reviews.</p>
        </div>
      )}

      {/* Edit Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Your Review</h3>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 border rounded"
            rows="3"
            placeholder="Write your updated review..."
          />
          <div className="modal-action">
            <form method="dialog">
              <button
                type="button"
                onClick={handleUpdate}
                className="btn btn-success mr-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="btn btn-secondary"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewSection;
