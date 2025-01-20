import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function OilLayouts() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-yellow-500 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo/Title */}
          <h2 className="text-2xl font-semibold">
            <Link to="/freshOil">Savarrah Fresh Oil</Link>
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
                <Link to="/fresh-oil/admin/upload">Food Upload</Link>
              </li>
              <li>
                <Link to="/fresh-oil/admin/bulk-upload">Bulk Upload</Link>
              </li>
              <li>
                <Link to="/fresh-oil/order-item">Order Item</Link>
              </li>
              <li>
                <Link to="/fresh-oil/orders">Orders</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-yellow-500 p-4 space-y-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/fresh-oil/admin/upload"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Food Upload
                </Link>
              </li>
              <li>
                <Link
                  to="/fresh-oil/order-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  to="/fresh-oil/search"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/fresh-oil/orders"
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

export default OilLayouts;
