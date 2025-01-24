import { useState, useEffect } from "react";
import Animal2 from "../../../assets/images/animal2.jpg";
import { getToken } from "../../../services/token";
import { useAnimalFeeding } from "../../../hooks/animalFeeding/useAnimalFeeding";

const FoodsBody = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const token = getToken();
  const baseURL = "http://localhost:5000";

  const { products, dispatch } = useAnimalFeeding();

  // Fetch products initially
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${baseURL}/api/v1/animal-feeding/products`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          dispatch({ type: "SET_ANIMAL_FEEDING_PRODUCTS", payload: data });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, dispatch]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="text-center py-12">No products found</div>;
  }

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      {/* Search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105"
          >
            <img
              src={product.image ? `${baseURL}${product.image}` : Animal2}
              loading="lazy"
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-600 mt-1">Idadi: {product.quantity}</p>
              <p className="text-gray-600 mt-1">
                Nutrients: {product.nutrients}
              </p>
              <p className="font-bold text-green-700 mt-2">
                Tsh {product.price}
              </p>
              <div className="mt-4 flex justify-between">
                <a
                  href={`/animal-feeding/products/${product._id}`}
                  className="bg-green-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-green-600"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-green-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Page <strong>{currentPage}</strong> of{" "}
          <strong>{Math.ceil(filteredProducts.length / itemsPerPage)}</strong>
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredProducts.length}
          className="bg-green-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FoodsBody;
