import { Outlet, Link } from "react-router-dom";

function HardwareLayout() {
  return (
    <>
      <div className="bg-blue-600 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo/Title */}
          <h2 className="text-2xl font-semibold">
            <Link to="/hardware">Savarrah Hardware</Link>
          </h2>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to="/hardware"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware/products"
                >
                  Place Order
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/hardware/orders"
                >
                  Order History
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
}

export default HardwareLayout;
