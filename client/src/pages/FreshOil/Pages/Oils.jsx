import { useState, useEffect } from "react";
import FreshOil1 from ".././../../assets/images/freshOil1.webp";
import FreshOil2 from ".././../../assets/images/avocado.png";

function Oils() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // State for fetched products
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 6; // Items per page for pagination

  useEffect(() => {
    // Fetch fresh oil products from API
    fetch("http://localhost:5000/api/v1/fresh-oil/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index of the first and last product on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Get the current products to be displayed on the page
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
      <div className="mb-4 submission">
        <input
          type="text"
          placeholder="Search for Fresh Oils..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div key={product._id} className="border rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image} // Using image from API response
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-yellow-700">Tsh {product.price}</p>

              <div className="flex justify-between">
                <a
                  href={`/freshOil/products/${product._id}`} // Use product._id
                  className="mt-4 inline-block bg-yellow-500 text-white py-2 px-4 rounded"
                >
                  Order Now
                </a>
                <a
                  href={`/freshOil/product-detail?productId=${product._id}`} // Use product._id
                  className="mt-4 inline-block bg-yellow-500 text-white py-2 px-4 rounded ml-2"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center m-2">
        <button
          onClick={handlePreviousPage}
          className="bg-yellow-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-yellow-600 mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-yellow-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-yellow-600 mr-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Oils;
