import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function AnimalFeedingLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
        <header className="container mx-auto">
          <div className="flex justify-between items-center p-4">
            {/* Logo/Title */}
            <h2 className="text-3xl font-bold tracking-tight">
              <Link
                to="/godown"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Godown
              </Link>
            </h2>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-white" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Navigation Links for Desktop */}
            <nav className="hidden lg:flex">
              <ul className="flex items-center space-x-1"> 
                <li>
                  <Link
                    className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    to="/godown/"
                  >
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    to="/godown/admin/upload"
                  >
                    <span>Item Upload</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    to="/godown/admin/bulk-upload"
                  >
                    <span>Bulk Upload</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    to="/godown/order-item"
                  >
                    <span>Order Item</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-green-200 transition-colors duration-200"
                    to="/godown/admin/manage"
                  >
                    Manage Godown
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    to="/godown/orders"
                  >
                    <span>Orders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    to="/godown/admin/move"
                  >
                    <span>Move</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-blue-900 border-t border-blue-700">
            <ul className="flex flex-col p-4 space-y-2">
            <li>
                  <Link
                    className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    to="/godown/"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Home</span>
                  </Link>
                </li>
              <li>
                <Link
                  className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  to="/godown/admin/upload"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Item Upload
                </Link>
              </li>
              <li>
                <Link
                  className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  to="/godown/admin/bulk-upload"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bulk Upload
                </Link>
              </li>
              <li>
                <Link
                  className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  to="/godown/order-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  to="/godown/orders"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  to="/godown/admin/move"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Move
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to="/godown/admin/manage"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Godown
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <Outlet />
    </div>
  );
}

export default AnimalFeedingLayout;
