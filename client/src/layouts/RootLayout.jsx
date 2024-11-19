import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Godown", path: "/godown" },
    { name: "Stationery", path: "/stationery" },
    { name: "Animal Feeding", path: "/animal-feeding" },
    { name: "Hardware", path: "/hardware" },
    { name: "Printing", path: "/printing" },
    { name: "FreshOil", path: "/freshOil" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <Link to="/">Savarrah</Link>
          </span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            aria-label="Toggle navigation"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`w-full ${isMenuOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
                    : "block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Login and Signup Buttons */}
          <div>
            <Link
              to="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>

      {/* Nested Routes */}
      <Outlet />
    </>
  );
};

export default RootLayout;
