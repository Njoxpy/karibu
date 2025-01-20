import { useState, useEffect } from "react";
import ProductsNotFound from "../../../components/ProductNotFound";

function Hardwares() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hardware products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("authToken"); // Get the token from localStorage

      if (!token) {
        console.error("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/hardware/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Invalid data format:", data);
          setProducts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get current items based on the page number
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Handle no products found
  if (products.length === 0 && !loading) {
    return <ProductsNotFound />;
  }

  // Filter products based on the search term
  const filteredProducts = currentProducts.filter((product) => {
    return (
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNext = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="mb-4 submission">
        <input
          type="text"
          placeholder="Search for hardware items ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image || "default-image.jpg"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold text-blue-700">Tsh {product.price}</p>
                <a
                  href={`/hardware/products/${product._id}`}
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center m-2">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Hardwares;
