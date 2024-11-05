import { Outlet, Link } from "react-router-dom";

function AnimalFeedingLayout() {
  return (
    <>
      <div className="bg-green-600 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo/Title */}
          <h2 className="text-2xl font-semibold">
            <Link to="/animal-feeding">Savarrah Animal Feeding</Link>
          </h2>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to="/animal-feeding/admin/upload"
                >
                  Food Upload
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to="/animal-feeding"
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to="/animal-feeding/search"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to="/animal-feeding/orders"
                >
                  Orders
                </Link>
              </li>
              <div className="hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 rounded bg-white text-gray-800 focus:outline-none"
                />
              </div>
            </ul>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
}

export default AnimalFeedingLayout;
