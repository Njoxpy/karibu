// src/pages/admin/ProductsPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    // Example static products data
    const [products, setProducts] = useState([
        {
            _id: '1',
            name: 'Product 1',
            description: 'Description for Product 1',
            price: '100',
        },
        {
            _id: '2',
            name: 'Product 2',
            description: 'Description for Product 2',
            price: '150',
        },
    ]);

    const handleDelete = (id) => {
        // Remove product from state
        setProducts(products.filter((product) => product._id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <Link
                to="/admin/products/add"
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block"
            >
                Add New Product
            </Link>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="border-b py-2 px-4">Name</th>
                        <th className="border-b py-2 px-4">Description</th>
                        <th className="border-b py-2 px-4">Price</th>
                        <th className="border-b py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td className="border-b py-2 px-4">{product.name}</td>
                                <td className="border-b py-2 px-4">{product.description}</td>
                                <td className="border-b py-2 px-4">{product.price}</td>
                                <td className="border-b py-2 px-4">
                                    <Link
                                        to={`/admin/products/edit/${product._id}`}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No products available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
