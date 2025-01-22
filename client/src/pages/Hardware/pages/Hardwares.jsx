import { useState, useEffect } from "react";
import FreshOil1 from "../../../assets/images/freshOil1.webp";
import { getToken } from "../../../services/token";

function Hardwares() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // State for fetched products
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 6; // Items per page for pagination
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    // Fetch fresh oil products from API with barrier token
    const token = getToken();

  
    fetch("http://localhost:5000/api/v1/hardware/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data); // Only set products if data is an array
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Filter products based on search term (check if products is an array)
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Calculate the index of the first and last product on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Get the current products to be displayed on the page
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4 submission">
        <input
          type="text"
          placeholder="Search for Fresh Hardwares..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Display Products or No Products Message */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No products available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
               <img
                              src={product.image ? `${baseURL}${product.image}` : FreshOil1}
                              alt={product.name}
                              className="w-full h-48 object-cover"
                            />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">Idadi {product.quantity}</p>
                <p className="font-bold text-blue-700">Tsh {product.price}</p>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <a
                    href={`/hardware/products/${product._id}`} // Use product._id
                    className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center m-2">
        <button
          onClick={handlePreviousPage}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Hardwares;
