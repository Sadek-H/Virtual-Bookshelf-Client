import React, { use, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import ReviewSection from '../../Services/ReviewSection';
import { AuthContext } from '../../Firebase/Context/AuthContext';
import axios from 'axios';

const Bookdetails = () => {
  let {user,token} = use(AuthContext);
    let {id} = useParams();
    let data = useLoaderData();
    let [book, setBook] = useState(null);
    useEffect(()=>{
        const filteredbook = data.find(book => book._id == id);
        setBook(filteredbook);
        
    },[id,data]);
    let handleupvote = () => {
        if(user.email  !== book.user_email){
          
            axios.put(`http://localhost:3000/books/${id}/upvote`,book,{
              headers: {
          Authorization: `Bearer ${token}`, //  Send token in header
        },
            })
            .then(res=>{
              
              if(book?.upvote){
              let num = book.upvote += 1 ;
                setBook( ({ ...book ,num}));
              }
            })
          
        }
          
    }
    return (
         <div className="max-w-5xl mx-auto px-6 py-10 bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-xl my-5">
        <h2 className="text-3xl font-bold  mb-8">Book Details</h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Book Cover */}
          <div className="relative">
            <img
              src={book?.cover_photo}
              alt={book?.book_title}
              className="w-full h-[400px] object-contain rounded-xl shadow-md p-4"
            />
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {book?.book_category}
            </span>
          </div>

          {/* Right: Book Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 leading-snug">
              {book?.book_title}
            </h1>
            <p className="text-lg text-gray-600">by <span className="font-semibold">{book?.book_author}</span></p>

            <p className="text-gray-700 text-[15px] leading-relaxed italic border-l-4 pl-4 border-blue-500">
              {book?.book_overview}
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700 mt-4">
              <p><strong>Total Pages:</strong> {book?.total_page}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-1 px-2 py-1 rounded text-white text-xs font-medium 
                  ${book?.reading_status === "Read" ? "bg-green-600" :
                    book?.reading_status === "Reading" ? "bg-yellow-500" : "bg-gray-500"}`}>
                  {book?.reading_status}
                </span>
              </p>
              <p><strong>Upvotes:</strong> {book?.upvote}</p>
              <p><strong>Added by:</strong> {book?.user_name}</p>
              <p><strong>Email:</strong> {book?.user_email}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              {
                user ? <button onClick={handleupvote} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow">
                 Upvote
              </button> : null
              }
              {book?.reading_status !== "Read" && (
                <button className="text-blue-600 underline font-medium hover:text-blue-800 transition text-sm">
                  Update Reading Status
                </button>
              )}
            </div>
          </div>
          
        </div>
         {/* Review Section Placeholder */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">📝 User Reviews</h2>
        <p className="text-sm text-gray-500 italic mb-2">
          Log in to write a review. Displaying latest reviews here...
        </p>
         <ReviewSection bookId={book?._id} />
      </div>
      </div>

    );
};

export default Bookdetails;