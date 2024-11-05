import { Outlet, Link } from "react-router-dom";

function AnimalFeedingLayout() {
  return (
    <>
      <div className="bg-green-600 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">
            <Link to={"/animal-feeding"}>Savarrah Animal Feeding</Link>
          </h2>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to={"admin/upload"}
                >
                  Food Upload
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to={"/animal-feeding"}
                >
                  Order Item
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to={"search"}
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to={"order/sucess"}
                >
                  Sucess
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-green-200 transition-colors duration-200"
                  to={"orders"}
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

export default AnimalFeedingLayout;
