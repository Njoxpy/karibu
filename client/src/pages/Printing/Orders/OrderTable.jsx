import { useState } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

const OrderTable = () => {
  const ordersPerPage = 5; // Number of orders per page
  const [orders] = useState([
    { id: 1, description: "Order 1", price: 100, status: "Completed", createdAt: "2024-11-01", userId: 1 },
    { id: 2, description: "Order 2", price: 200, status: "Pending", createdAt: "2024-11-02", userId: 2 },
    { id: 3, description: "Order 3", price: 300, status: "Shipped", createdAt: "2024-11-03", userId: 3 },
    { id: 4, description: "Order 4", price: 150, status: "Completed", createdAt: "2024-11-04", userId: 4 },
    { id: 5, description: "Order 5", price: 250, status: "Pending", createdAt: "2024-11-05", userId: 5 },
    { id: 6, description: "Order 6", price: 350, status: "Shipped", createdAt: "2024-11-06", userId: 6 },
    { id: 7, description: "Order 7", price: 400, status: "Completed", createdAt: "2024-11-07", userId: 7 },
    { id: 8, description: "Order 8", price: 500, status: "Pending", createdAt: "2024-11-08", userId: 8 },
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the orders to display for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="p-4 w-full">
        <h4 className="text-center font-bold p-2 text-blue-600">Order Table</h4>

        <div className="text-center w-full mb-6">
          <label htmlFor="filter" className="font-bold text-blue-600 mb-2 block">
            Filter By
          </label>
          <select
            name="filter"
            id="filter"
            className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="day">Day</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Order Id</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Date Created</th>
                <th scope="col" className="px-6 py-3">UserId</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Details</span></th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 border">{order.id}</td>
                  <td className="px-6 py-4 border">{order.description}</td>
                  <td className="px-6 py-4 border">{order.price}</td>
                  <td className="px-6 py-4 border">{order.status}</td>
                  <td className="px-6 py-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 border">{order.userId}</td>
                  <td className="px-6 py-4 text-right border">
                    <Link
                      to={`${order.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="text-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mr-2 disabled:bg-gray-400"
          >
            {"<"} Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Next {">"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderTable;
