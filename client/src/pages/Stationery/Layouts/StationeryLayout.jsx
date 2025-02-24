import { Outlet, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../../context/auth/AuthContext"; // Assuming you have an AuthContext

function StationeryLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading } = useContext(AuthContext); // Access user info from context

  // Loading state: show a spinner or a message if user data is still loading
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
  }

  return (
    <>
      <div className="bg-blue-600 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo/Title */}
          <h2 className="text-2xl font-semibold">
            <Link to="/stationery">Stationery</Link>
          </h2>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/stationery/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/stationery/order-item"
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/stationery/orders"
                >
                  Orders
                </Link>
              </li>

              {/* Admin Links (Only if user is admin) */}
              {user && user.role === "admin" && (
                <>
                  <li>
                    <Link
                      className="hover:text-blue-200 transition-colors duration-200"
                      to="/stationery/admin/upload"
                    >
                      Item Upload
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-blue-200 transition-colors duration-200"
                      to="/stationery/admin/manage"
                    >
                      Manage Items
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-blue-700 p-4 space-y-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/stationery/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/stationery/order-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/stationery/orders"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
              </li>

              {/* Admin Links for Mobile */}
              {user && user.role === "admin" && (
                <>
                  <li>
                    <Link
                      className="hover:text-blue-200 transition-colors duration-200"
                      to="/stationery/admin/upload"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Item Upload
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-blue-200 transition-colors duration-200"
                      to="/stationery/admin/manage"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Manage Items
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default StationeryLayout;
