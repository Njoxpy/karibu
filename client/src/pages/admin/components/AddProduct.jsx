// src/pages/admin/AddProduct.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('/API/v1/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            navigate('/admin/products'); // Navigate to products page after adding
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
