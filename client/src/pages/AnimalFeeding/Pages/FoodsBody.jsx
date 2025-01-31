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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <p className="text-gray-500 text-lg font-medium">No products found</p>
      </div>
    );
  }

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
      <div className="container mx-auto px-4">
        {/* Search bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.image ? `${baseURL}${product.image}` : Animal2}
                loading="lazy"
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 cursor-pointer">
                <h2 className="font-bold text-xl text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description.substr(0, 50)}
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Quantity:</span>{" "}
                    {product.quantity}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Nutrients:</span>{" "}
                    {product.nutrients}
                  </p>
                  <p className="font-bold text-green-700 text-lg">
                    Tsh {product.price.toLocaleString()}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={`/animal-feeding/products/${product._id}`}
                    className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-green-600"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-green-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700 px-4 py-2 mx-2">
            Page <strong>{currentPage}</strong> of{" "}
            <strong>{Math.ceil(filteredProducts.length / itemsPerPage)}</strong>
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredProducts.length}
            className="bg-green-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodsBody;
