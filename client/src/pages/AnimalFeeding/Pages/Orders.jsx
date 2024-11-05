// src/pages/Orders.js

import { useState } from "react";
import Footer from "../../../components/Footer";

const Orders = () => {
  // Local state for orders
  const [orders, setOrders] = useState([
    { productName: "Animal Feed A", quantity: 2, totalPrice: 40 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 20 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 20 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 20 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 20 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 20 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 20 },
  ]);

  const handleRemoveOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Orders List</h1>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Price
                </th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
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
                  <td className="border border-gray-300 px-4 py-2 flex justify-evenly">
                    <button
                      onClick={() => handleRemoveOrder(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-red-600 mr-2 "
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 transition-all .4s"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
