import { useState } from "react";

const OrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 1,
    category: "",
    totalPrice: 0,
    status: "pending",
    userId: "",
  });

  // Hardcoded products
  const products = [
    { name: "Animal Feed A", price: 2000 },
    { name: "Animal Feed B", price: 1500 },
    { name: "Animal Feed C", price: 2500 },
    { name: "Fresh Oil", price: 5000 },
    { name: "Printing Paper", price: 1000 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Automatically set the total price if product is selected
    if (name === "productName") {
      const selectedProduct = products.find((p) => p.name === value);
      if (selectedProduct) {
        setFormData((prev) => ({
          ...prev,
          totalPrice: selectedProduct.price * prev.quantity,
        }));
      }
    }
  };

  const handleQuantityChange = (e) => {
    const quantity = e.target.valueAsNumber || 1;
    setFormData((prev) => ({
      ...prev,
      quantity,
      totalPrice: prev.productName
        ? products.find((p) => p.name === prev.productName)?.price * quantity
        : prev.totalPrice,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to parent or submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded submission mt-4">
      <div className="mb-4">
        <label className="block mb-2">Select Product</label>
        <select
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        >
          <option value="">Select a Product</option>
          {products.map((product, index) => (
            <option key={index} value={product.name}>
              {product.name} - Tsh {product.price}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleQuantityChange}
          className="border rounded w-full p-2"
          min="1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Total Price</label>
        <input
          type="number"
          name="totalPrice"
          value={formData.totalPrice}
          readOnly
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">User ID</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
