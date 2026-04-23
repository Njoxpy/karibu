import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import useLogout from "../hooks/auth/useLogout";
import logo from "../assets/images/logoWithName.png";
import { useAuth } from "../hooks/auth/useAuth";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = useLogout();
  const { user } = useAuth();
  const fallbackLogo = "karibu";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    logout();
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  // Base menu items visible to all users
  const baseMenuItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  // Role-specific menu items for non-admin users
  const roleSpecificMenuItems = [
    ...(user?.category === "godown"
      ? [{ name: "Godown", path: "/godown" }]
      : []),
    ...(user?.category === "stationery"
      ? [{ name: "Stationery", path: "/stationery" }]
      : []),
    ...(user?.category === "animal-feeding"
      ? [{ name: "Animal Feeding", path: "/animal-feeding" }]
      : []),
    ...(user?.category === "hardware"
      ? [{ name: "Hardware", path: "/hardware" }]
      : []),
    ...(user?.category === "printing"
      ? [{ name: "Printing", path: "/printing" }]
      : []),
    ...(user?.role === "admin" ? [{ name: "Admin", path: "/admin" }] : []),
    ...(user?.category === "fresh-oil"
      ? [{ name: "Fresh Oil", path: "/fresh-oil" }]
      : []),
  ];

  // Admin-specific menu items
  const adminMenuItems = [
    { name: "Animal Feeding", path: "/animal-feeding" },
    { name: "Fresh Oil", path: "/fresh-oil" },
    { name: "Godown", path: "/godown" },
    { name: "Hardware", path: "/hardware" },
    { name: "Printing", path: "/printing" },
    { name: "Stationery", path: "/stationery" },
    { name: "Admin", path: "/admin" },
  ];

  // Combine all menu items based on user role
  const isAdmin = user?.role === "admin";
  const menuItems = isAdmin
    ? [...baseMenuItems, ...adminMenuItems]
    : [...baseMenuItems, ...roleSpecificMenuItems];

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" aria-label="Go to Home Page">
            <img
              src={logo || fallbackLogo}
              alt="karibu Logo"
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
                <p className="text-white text-sm font-semibold p-2">
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

      {/* Logout Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={setIsModalOpen}
        className="relative z-10"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Dialog container */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-[#141414] rounded-xl shadow-2xl border border-gray-800 p-8 max-w-md w-full transform transition-all duration-300 scale-100">
            {/* Header with icon and text */}
            <div className="flex items-start space-x-4 mb-8">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#e50914] to-[#b20710] shadow-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-white" />
              </div>

              <div className="flex-1 pt-1">
                <Dialog.Title className="text-xl font-semibold text-white leading-tight">
                  Confirm Logout
                </Dialog.Title>
                <Dialog.Description className="text-gray-400 mt-2 text-sm leading-relaxed">
                  Are you sure you want to log out? You'll need to sign in again
                  to access your account.
                </Dialog.Description>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-6 py-2.5 bg-gray-700/80 text-gray-200 rounded-lg hover:bg-gray-600 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#141414] transition-all duration-200 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-6 py-2.5 bg-gradient-to-r from-[#e50914] to-[#b20710] text-white rounded-lg hover:from-[#b20710] hover:to-[#8a0408] active:from-[#8a0408] active:to-[#5c0205] focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:ring-offset-2 focus:ring-offset-[#141414] transition-all duration-200 font-medium shadow-lg"
              >
                Logout
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Outlet />
    </>
  );
};

export default RootLayout;
