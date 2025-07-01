import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router"
 import { BsBookmarksFill } from "react-icons/bs";
 import { GrContact } from "react-icons/gr";
 import { FaPhoneAlt } from "react-icons/fa";
 import { IoLocation } from "react-icons/io5";
 
const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-gray-300 py-14">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2">
             <BsBookmarksFill className="text-blue-500 text-2xl"/>
          <h2 className="text-xl font-extrabold text-white mb-2 tracking-wide">
             Virtual Bookshelf
          </h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your personal space to manage, review, and explore your reading journey with ease and joy.
          </p>
        <p className="text-blue-400 underline hover:underline mt-2">Terms & Conditions</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <div className="flex flex-col text-sm space-y-2">
            <Link to="/" className="hover:text-white hover:underline transition">Home</Link>
            <Link to="/bookshelf" className="hover:text-white hover:underline transition">Bookshelf</Link>
            <Link to="/add-book" className="hover:text-white hover:underline transition">Add Book</Link>
            <Link to="/profile" className="hover:text-white hover:underline transition">Profile</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
         <div className="flex items-center gap-1">
             <GrContact  className="font-bold"/> <span className="text-gray-400">contact@virtualbookshelf.com</span>
         </div>
<div>
             <div className="flex items-center gap-1">
                 <FaPhoneAlt className="text-blue-200"/>  <span className="text-gray-400">+8801234567890</span>
             </div>
</div>
         <div className="flex items-center gap-1">
             <IoLocation className="text-red-100"/><span className="text-gray-400">Dhaka, Bangladesh</span>
         </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-5 text-2xl">
            <a href="https://www.facebook.com/sadek.hossen.773907/"  target="_blank" className="text-gray-400 hover:text-white hover:scale-110 transition transform duration-300">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/" target="_blank" className="text-gray-400 hover:text-white hover:scale-110 transition transform duration-300">
              <FaInstagram />
            </a>
            <a href="https://x.com/" target="_blank" className="text-gray-400 hover:text-white hover:scale-110 transition transform duration-300">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/sadek-hossen-53101b294/"  target="_blank" className="text-gray-400 hover:text-white hover:scale-110 transition transform duration-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} <span className="text-white">Virtual Bookshelf</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
