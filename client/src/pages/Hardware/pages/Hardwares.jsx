import { useState, useEffect } from "react";

function Hardwares() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hardware products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/hardware/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
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
          {currentProducts
            .filter((product) => {
              return searchTerm.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((product) => (
              <div key={product._id} className="border rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image || "default-image.jpg"} // You can set a default image if needed
                  alt={product.name}
                  loading="lazy"
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
                  <a
                    href={`/hardwares/product-detail?productId=${product._id}`}
                    className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded ml-2"
                  >
                    View Details
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
