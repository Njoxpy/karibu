import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../../assets/images/logPrinting.png";

function PrintingLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-blue-600 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link to="/printing" className="flex items-center space-x-2">
            <img src={logo} alt="karibu Logo" className="h-10 w-auto" />
          </Link>

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
                  to="/printing"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/printing/orders"
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
                  to="/printing"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/printing/orders"
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

export default PrintingLayout;
