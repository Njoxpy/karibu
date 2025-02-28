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
  const fallbackLogo = "Savarrah";

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
              <Link to={"/register"}>
                <button
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600 mt-4 lg:mt-0"
                  aria-label="Register"
                >
                  Register
                </button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        <div className="flex items-center justify-center fixed inset-0 z-50 p-4">
          <Dialog.Panel className="bg-[#141414] rounded-lg shadow-lg p-8 max-w-sm w-full space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#e50914]">
                <ExclamationTriangleIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Confirm Logout
                </h2>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to log out?
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-6 py-3 bg-[#e50914] text-white rounded-md hover:bg-[#b20710] focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
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
