import { useState } from 'react';
import Footer from '../../../components/Footer';

const products = [
    { id: 1, name: "Booklet", price: 5000, category: "office-equipment" },
    { id: 2, name: "Pencils", price: 100, category: "pen" },
    { id: 3, name: "Exercise Books", price: 2500, category: "books" },
];

const OrderItemStationery = () => {
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
        <>
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
                            value={`Tsh ${selectedProduct.price}`}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                    </div>

                    {/* Total Price */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Total Price</label>
                        <input
                            type="text"
                            value={`Tsh ${totalPrice}`}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                        Complete Order
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default OrderItemStationery;
