import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    // Example static products data related to Savvarah
    const [products, setProducts] = useState([
        {
            _id: 1,
            name: 'Fresh Olive Oil',
            description: 'High-quality olive oil for cooking and health.',
            price: '250',
        },
        {
            _id: 2,
            name: 'Animal Feed (Cattle)',
            description: 'Nutritious cattle feed for milk production.',
            price: '150',
        },
        {
            _id: 3,
            name: 'Printer Paper A4',
            description: 'Premium A4 paper for official use.',
            price: '80',
        },
        {
            _id: 4,
            name: 'Stationery Set',
            description: 'Complete stationery set for daily use.',
            price: '200',
        },
        {
            _id: 5,
            name: 'Animal Feed (Poultry)',
            description: 'Complete poultry feed for growth and eggs.',
            price: '120',
        },
        {
            _id: 6,
            name: 'Printing Services',
            description: 'Bulk printing services for documents and marketing.',
            price: '500',
        },
    ]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleDelete = (id) => {
        // Remove product from state
        setProducts(products.filter((product) => product._id !== id));
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
        });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...selectedProduct,
            ...formData,
        };

        // Update the product in the state
        setProducts(products.map(product =>
            product._id === selectedProduct._id ? updatedProduct : product
        ));

        setShowModal(false);
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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className='text-center'>
                            <th className="border-b py-2 px-4">Name</th>
                            <th className="border-b py-2 px-4">Description</th>
                            <th className="border-b py-2 px-4">Price</th>
                            <th className="border-b py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td className="border-b py-2 px-4">{product.name}</td>
                                    <td className="border-b py-2 px-4 text-sm md:text-base">{product.description}</td>
                                    <td className="border-b py-2 px-4">Tsh {product.price}</td>
                                    <td className="border-b py-2 px-4">
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-gray-300 text-black py-1 px-3 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-1 px-3 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
