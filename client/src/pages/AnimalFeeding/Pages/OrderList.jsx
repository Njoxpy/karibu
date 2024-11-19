import React from 'react';
import useFetch from '../../../hooks/useFetch'; // Import the custom hook

const OrdersList = () => {
    const ENDPOINT = 'http://localhost:4000/api/v1/animal-feeding/orders/'
    const { data: orders, loading, error } = useFetch(ENDPOINT);

    if (loading) {
        return <div className="text-center text-lg mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 text-lg mt-5">
                Error: {error}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return <div className="text-center text-gray-600 text-lg mt-5">No orders found.</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-5">All Orders</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Order ID</th>
                            <th className="border border-gray-300 px-4 py-2">User ID</th>
                            <th className="border border-gray-300 px-4 py-2">Product Name</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Total Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId} className="text-center hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.userId}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.productName}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">${order.totalPrice}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.status[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersList;
