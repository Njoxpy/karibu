import { Outlet, Link } from "react-router-dom";

const StationeryLayout = () => {
  return (
    <>
      <div>
        <div className="bg-blue-600 text-white shadow-md">
          <header className="container mx-auto flex justify-between items-center p-4">
            {/* Logo/Title */}
            <h2 className="text-2xl font-semibold">
              <Link to="/stationery">Stationery</Link>
            </h2>

            {/* Navigation Links */}
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    className="hover:text-green-200 transition-colors duration-200"
                    to="/stationery"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-green-200 transition-colors duration-200"
                    to="/stationery/admin/upload"
                  >
                    Stationery Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-green-200 transition-colors duration-200"
                    to="/stationery"
                  >
                    Order Item
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-green-200 transition-colors duration-200"
                    to="/stationery/orders"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default StationeryLayout;
