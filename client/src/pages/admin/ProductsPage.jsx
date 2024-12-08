import { useState } from "react";

const ProductsPage = () => {
    // Array of products
    const [products, setProducts] = useState([
        { id: 1, name: "Product A", price: 20, stock: 50 },
        { id: 2, name: "Product B", price: 30, stock: 100 },
        { id: 3, name: "Product C", price: 15, stock: 200 },
        { id: 4, name: "Product D", price: 25, stock: 75 },
    ]);

    // Handle Edit and Delete actions
    const handleEdit = (id) => {
        console.log(`Edit product with id: ${id}`);
        // Logic for editing the product goes here
    };

    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        console.log(`Deleted product with id: ${id}`);
    };

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
                    {/* Loop through the products */}
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-4 py-2">{product.name}</td>
                            <td className="px-4 py-2">Tsh {product.price}</td>
                            <td className="px-4 py-2">{product.stock}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleEdit(product.id)}
                                    className="text-indigo-600 hover:underline mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
