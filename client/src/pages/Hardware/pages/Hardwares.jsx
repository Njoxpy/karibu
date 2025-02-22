import { useState, useEffect } from "react";
import Animal2 from "../../../assets/images/animal2.jpg";
import { getToken } from "../../../services/token";
import { useAnimalFeeding } from "../../../hooks/animalFeeding/useAnimalFeeding";
import { Search } from "lucide-react";

const Hardwares = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const itemsPerPage = 6;

  const token = getToken();
  const baseURL = "http://localhost:5000";
  const { products, dispatch } = useAnimalFeeding();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/api/v1/hardware/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch products");
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, description ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
              />
            </div>
            {debouncedSearchTerm && (
              <p className="mt-2 text-sm text-gray-600">
                Found {filteredProducts.length} results for "
                {debouncedSearchTerm}"
              </p>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              No products found matching your search
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
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
                  <div className="p-6">
                    <h2 className="font-bold text-xl text-gray-800 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description.substr(0, 50)}...
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
                      <p className="font-bold text-indigo-700 text-lg">
                        Tsh {product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/hardware/products/${product._id}`}
                        className="block w-full text-center bg-indigo-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-indigo-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-700 px-4 py-2 mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredProducts.length / itemsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= filteredProducts.length}
                className="bg-indigo-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hardwares;
