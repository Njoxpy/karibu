import { Outlet, Link } from "react-router-dom";

const GodownLayout = () => {
  return (
    <>
      <>
        <div>
          <div className="bg-gray-600 text-white shadow-md">
            <header className="container mx-auto flex justify-between items-center p-4">
              {/* Logo/Title */}
              <h2 className="text-2xl font-semibold">
                <Link to="/godown">Godown</Link>
              </h2>

              {/* Navigation Links */}
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link
                      className="text-white hover:underline"
                      to="/godown/admin/upload"
                    >
                      Godown Upload
                    </Link>
                  </li>
                  <li>
                    <Link className="text-white hover:underline" to="/godown">
                      Order Item
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:underline"
                      to="/godown/admin/move"
                    >
                      Move Item
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:underline"
                      to="/godown/orders"
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
    </>
  );
};

export default GodownLayout;
