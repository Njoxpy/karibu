import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../../components/Footer";

const OrderForm = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("productId");

  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic
  };

  return (
    <>
      <div className="p-4 bg-green-50 submission">
        <h1 className="text-2xl font-bold mb-6">Order Animal Product</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded w-full p-2"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Place Order
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default OrderForm;
