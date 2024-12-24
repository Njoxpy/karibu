import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    // Example static products data related to Savvarah
    const [products, setProducts] = useState([
        { _id: 1, name: 'Fresh Olive Oil', category: 'oil', description: 'High-quality olive oil for cooking and health.', price: '250' },
        { _id: 2, name: 'Animal Feed (Cattle)', category: 'animal feed', description: 'Nutritious cattle feed for milk production.', price: '150' },
        { _id: 3, name: 'Printer Paper A4', category: 'stationery', description: 'Premium A4 paper for official use.', price: '80' },
        { _id: 4, name: 'Stationery Set', category: 'stationery', description: 'Complete stationery set for daily use.', price: '200' },
        { _id: 5, name: 'Animal Feed (Poultry)', category: 'animal feed', description: 'Complete poultry feed for growth and eggs.', price: '120' },
        { _id: 6, name: 'Printing Services', category: 'printing', description: 'Bulk printing services for documents and marketing.', price: '500' },
    ]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState(""); // Filter for category
    const itemsPerPage = 5;

    // Handle delete
    const handleDelete = (id) => {
        setProducts(products.filter((product) => product._id !== id));
    };

    // Handle edit click
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormData({ name: product.name, description: product.description, price: product.price });
        setShowModal(true);
    };

    // Handle modal close
    const handleModalClose = () => {
        setShowModal(false);
    };

    // Handle form change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit (update product)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = { ...selectedProduct, ...formData };
        setProducts(products.map(product => product._id === selectedProduct._id ? updatedProduct : product));
        setShowModal(false);
    };

    // Filter products based on search term and category
    const filteredProducts = products.filter(product => {
        return (
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (categoryFilter ? product.category === categoryFilter : true)
        );
    });

    // Paginate the filtered products
    const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Pagination Controls
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePagination = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <Link to="/admin/products/add" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">
                Add New Product
            </Link>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="p-2 border rounded w-full"
                    placeholder="Search by product name or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Category Filter */}
            <div className="mb-4">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option value="">All Categories</option>
                    <option value="oil">Oil</option>
                    <option value="animal feed">Animal Feed</option>
                    <option value="stationery">Stationery</option>
                    <option value="printing">Printing</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="text-center">
                            <th className="border-b py-2 px-4">Name</th>
                            <th className="border-b py-2 px-4">Description</th>
                            <th className="border-b py-2 px-4">Price</th>
                            <th className="border-b py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
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

            {/* Pagination */}
            <div className="mt-5 flex justify-between items-center">
                <button
                    onClick={() => handlePagination(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePagination(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Next
                </button>
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
