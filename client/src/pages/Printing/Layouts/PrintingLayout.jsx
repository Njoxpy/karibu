import { Outlet, Link } from "react-router-dom";

function PrintingLayout() {
  return (
    <>
      <div className="bg-blue-600 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo/Title */}
          <h2 className="text-2xl font-semibold">
            <Link to="/printing">Savarrah Printing</Link>
          </h2>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/printing/submit"
                >
                  Place Order
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/printing/orders"
                >
                  Order History
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200"
                  to="/animal-feeding/orders"
                >
                  Orders
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

export default PrintingLayout;
