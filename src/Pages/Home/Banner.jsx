import React from "react";
import { ImBooks } from "react-icons/im";
import { Link } from "react-router";
import { motion } from "framer-motion";

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
const navigateSlide = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ block: "nearest" });
};

const Banner = () => {
  return (
    <div className="bg-white text-center pt-10 pb-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="space-y-2 mb-6 flex flex-col items-center"
      >
        <div className="flex justify-center items-center gap-2">
          <ImBooks className="text-5xl" />
          <h1 className="text-4xl font-extrabold text-gray-900">Book App</h1>
        </div>
        <p className="text-gray-500 text-base">
          Explore book app designs for inspiration
        </p>
      </motion.div>

      {/* DaisyUI Carousel */}
      <div className="carousel rounded-xl shadow-lg relative">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1470&q=80"
            className="w-full object-cover h-[420px]"
            alt="Books"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10 z-10"></div>

          <motion.div
            key="#slide1"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="absolute left-8 top-1/3 text-left z-20 text-white space-y-3 max-w-md"
          >
            <h2 className="text-3xl md:text-5xl font-bold drop-shadow">
              Fuel Your Reading Habit
            </h2>
            <p className="text-sm md:text-base max-w-md">
              Track, explore and review books all in one beautiful app.
            </p>
            <Link
              to="/bookshelf"
              className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-full text-sm font-semibold"
            >
              Start Exploring
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-30">
            <a
              href="#slide3"
              onClick={(e) => navigateSlide(e, "slide3")}
              className="btn btn-circle btn-sm bg-white/70 hover:bg-white"
            >
              ❮
            </a>
            <a
              href="#slide2"
              onClick={(e) => navigateSlide(e, "slide2")}
              className="btn btn-circle btn-sm bg-white/70 hover:bg-white"
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1470&q=80"
            className="w-full object-cover h-[420px]"
            alt="Reading"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>

          <motion.div
            key="#slide2"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="absolute left-8 top-1/3 text-left z-20 text-white space-y-3 max-w-md"
          >
            <h2 className="text-3xl md:text-5xl font-bold drop-shadow">
              Organize Your Bookshelf
            </h2>
            <p className="text-sm md:text-base max-w-md">
              Categorize by genre or reading status with elegant visuals.
            </p>
            <Link
              to="/add-book"
              className="inline-block bg-pink-500 hover:bg-pink-600 transition px-6 py-2 rounded-full text-sm font-semibold"
            >
              Add a Book
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-30">
            <a
              href="#slide1"
              onClick={(e) => navigateSlide(e, "slide1")}
              className="btn btn-circle btn-sm bg-white/70 hover:bg-white"
            >
              ❮
            </a>
            <a
              href="#slide3"
              onClick={(e) => navigateSlide(e, "slide3")}
              className="btn btn-circle btn-sm bg-white/70 hover:bg-white"
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80"
            className="w-full object-cover h-[420px]"
            alt="Library"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>

          <motion.div
            key="#slide3"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="absolute left-8 top-1/3 text-left z-20 text-white space-y-3 max-w-md"
          >
            <h2 className="text-3xl md:text-5xl font-bold drop-shadow">
              Join Book-Lovers Worldwide
            </h2>
            <p className="text-sm md:text-base max-w-md">
              Discover, review and recommend the best reads.
            </p>
            <Link
              to="/bookshelf"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-full text-sm font-semibold"
            >
              View Your Shelf
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-30">
            <a
              href="#slide2"
              onClick={(e) => navigateSlide(e, "slide2")}
              className="btn btn-circle btn-sm bg-white/70 hover:bg-white"
            >
              ❮
            </a>
            <a
              href="#slide1"
              onClick={(e) => navigateSlide(e, "slide1")}
              className="btn btn-circle btn-sm bg-white/70 hover:bg-white"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
