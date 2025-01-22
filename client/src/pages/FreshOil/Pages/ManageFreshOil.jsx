import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";

const ManageFreshOil = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/fresh-oil/products/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data); // Assuming API returns an array of products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit product with ID: ${id}`);
    // Redirect to edit page or open modal
  };

  const handleDelete = async (id) => {
    console.log(`Delete product with ID: ${id}`);
    // Perform delete logic
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the product.");
      }
      // Remove deleted product from the state
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-green-50">
        <h1 className="text-2xl font-bold mb-6 text-center">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-green-50">
        <h1 className="text-2xl font-bold mb-6 text-center">Error: {error}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-green-50">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Manage Animal Products
        </h1>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">
                  <img
                    src={product.image || "/default-image.jpg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">Tsh {product.price}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a
          href="/fresh-oil/admin/upload"
          className="mt-4 inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
        >
          Add New Product
        </a>
      </div>
      <Footer />
    </>
  );
};

export default ManageFreshOil;
