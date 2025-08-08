import React, { use,  useState } from "react";
import { NavLink } from "react-router"; 
import { FaSearch, FaBookOpen } from "react-icons/fa";
import { AuthContext } from "../../Firebase/Context/AuthContext";
import { toast } from "react-toastify";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const { user, signOutuser } = use(AuthContext);
  const [openbar, setopenBar] = useState(false);

  const handlelogout = () => {
    signOutuser().then(() => {
      toast.success("Logout successful!");
    });
  };

  const handleClick = () => {
    setopenBar(!openbar);
  };

  return (
   <div className="border-b-fuchsia-100 shadow fixed top-0 left-0 w-full z-50 bg-white">
     <div className="container mx-auto rounded-lg px-4 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <FaBookOpen className="text-xl md:text-2xl text-blue-600" />
          <span className="text-2xl md:text-3xl mona-sans italic font-bold text-gray-800">
            BookShelf
          </span>
        </div>

       
        <div className="hidden lg:flex flex-1 justify-center font-medium text-gray-800">
          <div className="flex items-center gap-x-6 text-xl font-bold whitespace-nowrap">
            <NavLink to="/" className="hover:text-blue-600 mona-sans text-">
              Home
            </NavLink>
            <NavLink to="/bookshelf" className="hover:text-blue-600 mona-sans">
              Bookshelf
            </NavLink>
            <NavLink to="/add-book" className="hover:text-blue-600 mona-sans">
              Add Book
            </NavLink>
            <NavLink to="/my-book" className="hover:text-blue-600 mona-sans">
              My Book
            </NavLink>
          </div>
        </div>

        {/* Right: User Actions */}
        <div className="hidden lg:flex items-center font-medium text-gray-800">
          {user ? (
            <div className="flex items-center gap-x-4 text-xl font-bold whitespace-nowrap">
              <NavLink to="/profile" className="hover:text-blue-600 mona-sans">
                Profile
              </NavLink>
              <button onClick={handlelogout} className="hover:text-blue-600 mona-sans">
                LogOut
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-x-4 text-xl font-bold whitespace-nowrap">
              <NavLink to="/login" className="hover:text-blue-600 mona-sans">
                Login
              </NavLink>
              <NavLink to="/register" className="hover:text-blue-600 mona-sans">
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <FaBarsStaggered
          onClick={handleClick}
          className="block lg:hidden cursor-pointer text-xl md:text-2xl text-gray-700 hover:text-blue-600 transition-colors duration-200 ml-2"
        />
      </div>

      {/* Mobile Menu */}
      {openbar && (
        <div className="w-full lg:hidden mt-4 rounded-lg  px-6 py-6 animate-fade-down border-b-fuchsia-100 shadow">
          <div className="flex flex-col justify-start gap-4 text-lg font-semibold text-gray-800 w-max">
            <NavLink
              to="/"
              onClick={() => setopenBar(false)}
              className="hover:text-blue-600 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/bookshelf"
              onClick={() => setopenBar(false)}
              className="hover:text-blue-600 transition"
            >
              Bookshelf
            </NavLink>
            <NavLink
              to="/add-book"
              onClick={() => setopenBar(false)}
              className="hover:text-blue-600 transition"
            >
              Add Book
            </NavLink>
            <NavLink
              to="/my-book"
              onClick={() => setopenBar(false)}
              className="hover:text-blue-600 transition"
            >
              My Book
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setopenBar(false)}
                  className="hover:text-blue-600 transition"
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    handlelogout();
                    setopenBar(false);
                  }}
                  className="hover:text-blue-600 transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setopenBar(false)}
                  className="hover:text-blue-600 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setopenBar(false)}
                  className="hover:text-blue-600 transition"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
   </div>
  );
};

export default Navbar;