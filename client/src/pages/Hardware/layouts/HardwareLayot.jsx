import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function HardwareLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-blue-600 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo/Title */}
          <h2 className="text-2xl font-semibold">
            <Link to="/hardware">Savarrah Hardware</Link>
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
                  to="/hardware/admin/upload"
                >
                  Hardware Upload
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware/admin/bulk-upload"
                >
                  Bulk Upload
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware"
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware/orders"
                >
                  Orders
                </Link>
              </li>
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
                  to="/hardware/admin/upload"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hardware Upload
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware/admin/bulk-upload"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bulk Upload
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware/orders"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default HardwareLayout;
