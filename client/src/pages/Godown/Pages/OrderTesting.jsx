import { useState } from "react";

const OrdersTestings = () => {
  // Sample orders data
  const orders = [
    { productName: "Animal Feed A", quantity: 2, totalPrice: 40 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 20 },
    { productName: "Animal Feed C", quantity: 3, totalPrice: 60 },
    { productName: "Animal Feed D", quantity: 5, totalPrice: 100 },
    { productName: "Animal Feed E", quantity: 4, totalPrice: 80 },
    { productName: "Animal Feed F", quantity: 2, totalPrice: 40 },
    { productName: "Animal Feed G", quantity: 3, totalPrice: 60 },
    { productName: "Animal Feed H", quantity: 1, totalPrice: 20 },
    { productName: "Animal Feed I", quantity: 4, totalPrice: 80 },
    { productName: "Animal Feed J", quantity: 2, totalPrice: 40 },
  ];

  // Pagination setup
  const itemsPerPage = 3; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Get the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  // Function to change pages
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Orders List</h1>
      {currentOrders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-green-200">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={index} className="hover:bg-green-100">
                <td className="border border-gray-300 px-4 py-2">
                  {order.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${order.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex justify-center">
        {/* Pagination controls */}
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-l"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTestings;
