import { useState, useEffect } from "react";
import Animal2 from "../../../assets/images/animal2.jpg"; // Update the path accordingly

function FoodsBody() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/animal-feeding/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set the fetched products
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination setup
  const itemsPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // Function to change pages
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="mb-4 submission">
        <input
          type="text"
          placeholder="Search for animal food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      
      {/* Loading state */}
      {isLoading && <p>Loading products...</p>}
      
      {/* Error state */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display products */}
      {currentProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts
            .filter((product) => {
              return searchTerm.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image || Animal2} // Use default image if no image is provided
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="font-bold text-green-700">Tsh {product.price}</p>
                  <a
                    href={`/animal-feeding/products/${product._id}`}
                    className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Order Now
                  </a>
                  <a
                    href={`/animal-feeding/product-detail?productId=${product._id}`}
                    className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded ml-2"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-green-500 text-white px-4 py-2 rounded-l"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-green-500 text-white px-4 py-2 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FoodsBody;
