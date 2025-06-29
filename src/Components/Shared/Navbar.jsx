import React, { use, useState } from "react";
import { NavLink } from "react-router"; // FIX: use react-router-dom
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
    <div className="container mx-auto bg-white px-4 py-2">
      <div className="flex items-center justify-between w-full ">
        <FaBarsStaggered
          onClick={handleClick}
          className="block lg:hidden cursor-pointer text-xl md:text-2xl text-gray-700 hover:text-blue-600 transition-colors duration-200 ml-2"
        />
        <div className="flex items-center space-x-2">
          <FaBookOpen className="text-xl md:text-2xl text-blue-600" />
          <span className="text-2xl md:text-3xl font-bold text-gray-800">BookShelf</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex font-medium text-gray-800">
          <div className="flex items-center gap-x-6 text-xl font-bold whitespace-nowrap">
            <NavLink to="/" className="hover:text-blue-600">
              Home
            </NavLink>
            <NavLink to="/bookshelf" className="hover:text-blue-600">
              Bookshelf
            </NavLink>
            <NavLink to="/add-book" className="hover:text-blue-600">
              Add Book
            </NavLink>
            <NavLink to="/my-book" className="hover:text-blue-600">
              My Book
            </NavLink>
            {user ? (
              <>
                <NavLink to="/profile" className="hover:text-blue-600">
                  Profile
                </NavLink>
                <button onClick={handlelogout} className="hover:text-blue-600">
                  LogOut
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="hover:text-blue-600">
                  Login
                </NavLink>
                <NavLink to="/register" className="hover:text-blue-600">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

     {openbar && (
  <div className="w-full lg:hidden mt-4 rounded-lg bg-blue-100 px-6 py-6 animate-fade-down ">
    <div className="flex flex-col justify-start gap-4 text-lg font-semibold text-gray-800 w-max">
      <NavLink to="/" onClick={() => setopenBar(false)} className="hover:text-blue-600 transition">
        Home
      </NavLink>
      <NavLink to="/bookshelf" onClick={() => setopenBar(false)} className="hover:text-blue-600 transition">
        Bookshelf
      </NavLink>
      <NavLink to="/add-book" onClick={() => setopenBar(false)} className="hover:text-blue-600 transition">
        Add Book
      </NavLink>
      <NavLink to="/my-book" onClick={() => setopenBar(false)} className="hover:text-blue-600 transition">
        My Book
      </NavLink>

      {user ? (
        <>
          <NavLink to="/profile" onClick={() => setopenBar(false)} className="hover:text-blue-600 transition">
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
          <NavLink to="/login" onClick={() => setopenBar(false)} className="hover:text-blue-600 transition">
            Login
          </NavLink>
          <NavLink to="/register" onClick={() => setopenBar(false)} className="hover:text-blue-600 transition">
            Register
          </NavLink>
        </>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Navbar;