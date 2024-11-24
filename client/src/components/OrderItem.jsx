import React, { useState } from 'react';

const products = [
    { id: 1, name: "Office Printer", price: 150, category: "office-equipment" },
    { id: 2, name: "Gaming Laptop", price: 1200, category: "electronics" },
    { id: 3, name: "Wireless Mouse", price: 25, category: "accessories" },
];

const OrderItem = () => {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(selectedProduct.price);

    const handleProductChange = (event) => {
        const productId = parseInt(event.target.value);
        const product = products.find((product) => product.id === productId);
        setSelectedProduct(product);
        setTotalPrice(product.price * quantity);
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
        setTotalPrice(selectedProduct.price * newQuantity);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const orderData = {
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            quantity,
            totalPrice,
        };
        console.log('Order Data:', orderData);
        // Handle further order submission (API call, etc.)
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Place Your Order</h2>

            <form onSubmit={handleSubmit}>
                {/* Product Dropdown */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select Product</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        value={selectedProduct.id}
                        onChange={handleProductChange}
                    >
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        value={selectedProduct.name}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                </div>

                {/* Product Category */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        value={selectedProduct.category}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                </div>

                {/* Quantity Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        min="1"
                    />
                </div>

                {/* Price per Item */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price per Item</label>
                    <input
                        type="text"
                        value={`$${selectedProduct.price}`}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                </div>

                {/* Total Price */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Total Price</label>
                    <input
                        type="text"
                        value={`$${totalPrice}`}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-sm text-gray-600">I agree to the terms and conditions</span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
                >
                    Complete Order
                </button>
            </form>
        </div>
    );
};

export default OrderItem;
