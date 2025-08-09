import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { FaBookOpen } from "react-icons/fa";
import { AuthContext } from "../../Firebase/Context/AuthContext";
import { toast } from "react-toastify";
import { FaBarsStaggered } from "react-icons/fa6";


const Navbar = ({ theme, setTheme }) => {
  const { user, signOutuser } = useContext(AuthContext);

  const [openbar, setopenBar] = useState(false);

  const handlelogout = () => {
    signOutuser().then(() => {
      toast.success("Logout successful!");
    });
  };

  const handletoggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleClick = () => {
    setopenBar(!openbar);
  };

  return (
    <div
      className={`border-b-fuchsia-100 shadow fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto rounded-lg px-4 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <FaBookOpen
              className={`text-xl md:text-2xl ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <span
              className={`text-2xl md:text-3xl mona-sans italic font-bold ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              BookShelf
            </span>
          </div>

          {/* Center: Navigation Links */}
          <div
            className={`hidden lg:flex flex-1 justify-center font-medium transition-colors duration-500 ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <div className="flex items-center gap-x-6 text-xl font-bold whitespace-nowrap">
              <NavLink to="/" className="hover:text-blue-600 mona-sans" end>
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
          <div
            className={`hidden lg:flex items-center font-medium transition-colors duration-500 ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {user ? (
              <div className="flex items-center gap-x-4 text-xl font-bold whitespace-nowrap">
                <NavLink to="/profile" className="hover:text-blue-600 mona-sans">
                  Profile
                </NavLink>
                <button
                  onClick={handlelogout}
                  className="hover:text-blue-600 mona-sans"
                >
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

            {/* Theme Toggle */}
            <label className="relative inline-flex items-center cursor-pointer ml-6">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handletoggle}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full border border-gray-300 peer-checked:translate-x-6 peer-checked:border-blue-600 transition-transform duration-300"></div>
            </label>
          </div>

          {/* Mobile Menu Icon */}
          <FaBarsStaggered
            onClick={handleClick}
            className={`block lg:hidden cursor-pointer text-xl md:text-2xl transition-colors duration-200 ml-2 ${
              theme === "dark"
                ? "text-gray-200 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          />
        </div>

        {/* Mobile Menu */}
        {openbar && (
          <div
            className={`w-full lg:hidden mt-4 rounded-lg px-6 py-6 animate-fade-down border-b-fuchsia-100 shadow transition-colors duration-500 ${
              theme === "dark"
                ? "bg-gray-900 text-gray-200"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="flex flex-col justify-start gap-4 text-lg font-semibold whitespace-nowrap">
              <NavLink
                to="/"
                onClick={() => setopenBar(false)}
                className="hover:text-blue-600 transition"
                end
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

              {/* Mobile theme toggle */}
              <label className="toggle text-base-content cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={handletoggle}
                  checked={theme === "dark"}
                  className="theme-controller"
                />
                <svg
                  aria-label="sun"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 ${
                    theme === "dark" ? "text-gray-400" : "text-yellow-500"
                  }`}
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </g>
                </svg>
                <svg
                  aria-label="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 ${
                    theme === "dark" ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </g>
                </svg>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
