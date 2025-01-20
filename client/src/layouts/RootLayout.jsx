"use client";

import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import useLogout from "../hooks/auth/useLogout"; // Import the useLogout hook
import logo from "../assets/images/logoWithName.png"; // Import your logo image
import { useAuth } from "../hooks/auth/useAuth";
import { Dialog } from "@headlessui/react"; // Import Dialog component
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"; // Import Icon for the modal

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = useLogout(); // Use the useLogout hook
  const { user } = useAuth();
  const fallbackLogo = "Savarrah";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const confirmLogout = () => {
    setIsModalOpen(false); // Close the modal
    logout(); // Call the logout function to log the user out
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Close the modal without logging out
  };

  // Define menu items
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" }, // Always visible for all users
    ...(user?.category === "godown"
      ? [{ name: "Godown", path: "/godown" }]
      : []),
    ...(user?.category === "stationery"
      ? [{ name: "Stationery", path: "/stationery" }]
      : []),
    ...(user?.category === "animalFeeding"
      ? [{ name: "Animal Feeding", path: "/animal-feeding" }]
      : []),
    ...(user?.category === "hardware"
      ? [{ name: "Hardware", path: "/hardware" }]
      : []),
    ...(user?.category === "printing"
      ? [{ name: "Printing", path: "/printing" }]
      : []),
    ...(user?.category === "freshOil"
      ? [{ name: "FreshOil", path: "/freshOil" }]
      : []),
    ...(user?.category === "admin"
      ? [
          { name: "Admin", path: "/admin" },
          { name: "Settings", path: "/settings" }, // Add more admin links as needed
        ]
      : []),
  ];

  // If user is admin, show all pages (Admin role can access all pages)
  const isAdmin = user?.role === "admin"; // Check if the user is admin

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" aria-label="Go to Home Page">
            <img
              src={logo || fallbackLogo}
              alt="Savarrah Logo"
              className="h-10 w-auto"
              onError={(e) => {
                e.target.src = fallbackLogo;
              }}
            />
          </Link>
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
          className={`w-full ${
            isMenuOpen ? "block" : "hidden"
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

          {/* Conditional Rendering for Login/Logout */}
          {!user ? (
            <div>
              <Link
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-2"
              >
                Login
              </Link>
            </div>
          ) : (
            <>
              <div>
                <p className="text-white text-sm font-semibold">
                  {user?.email}
                </p>
              </div>
              <div>
                <button
                  onClick={handleLogoutClick}
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-red-500 bg-red-500 hover:bg-red-600 hover:border-red-600 mt-4 lg:mt-0 transition duration-200"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Modal Popup using Headless UI's Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={setIsModalOpen}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="flex items-center justify-center fixed inset-0 z-50">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                <p className="mb-6">Are you sure you want to log out?</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Nested Routes */}
      <Outlet />
    </>
  );
};

export default RootLayout;
