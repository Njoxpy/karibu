import React from "react";

const ProductsPage = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
            <table className="min-w-full mt-4 bg-white shadow rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left text-gray-600">Product Name</th>
                        <th className="px-4 py-2 text-left text-gray-600">Price</th>
                        <th className="px-4 py-2 text-left text-gray-600">Stock</th>
                        <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through products */}
                    <tr>
                        <td className="px-4 py-2">Example Product</td>
                        <td className="px-4 py-2">$20.00</td>
                        <td className="px-4 py-2">50</td>
                        <td className="px-4 py-2">
                            <button className="text-indigo-600 hover:underline">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
