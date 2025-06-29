import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiSpellBook, GiFeather, GiFairyWand } from "react-icons/gi";

const categoryIcons = [
  <GiSpellBook className="text-4xl text-indigo-500 mb-2 mx-auto" />,
  <GiFeather className="text-4xl text-green-600 mb-2 mx-auto" />,
  <GiFairyWand className="text-4xl text-purple-500 mb-2 mx-auto" />,
];

const categoryDescriptions = {
  Fiction: "Dive into imaginative stories and characters.",
  "Non-Fiction": "Explore real-life stories and knowledge.",
  Fantasy: "Enter magical worlds and epic adventures.",
};

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
        const catfilter = data.map((book) => book.book_category);
        const singlecat = [...new Set(catfilter)];
        console.log(singlecat);
        setCategories(singlecat);
      });
  }, []);

  const countCategory = (categories) => {
    return allBooks.filter((filtercat) => filtercat.book_category == categories)
      .length;
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
      Featured <span className="text-blue-500">Categories</span>
    </h2>
      <p className="text-center text-gray-500 font-medium  mb-7 text-lg max-w-2xl mx-auto">
        Discover your next favorite book by exploring our curated categories.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat}
            className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 bg-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="p-6 text-center">
              <div>{categoryIcons[idx]}</div>

              <h3 className="text-2xl font-semibold text-gray-800">{cat}</h3>

              <p className="text-gray-700  mb-3">{categoryDescriptions[cat]}</p>

              <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white text-sm font-medium px-3 py-1 rounded-full">
                {countCategory(cat)} books
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
