import { useState, useEffect } from "react";
import Animal2 from "../../../assets/images/animal2.jpg"; // Default image
import { useAnimalFeeding } from "../../../hooks/animalFeeding/useAnimalFeeding"; // Custom hook for fetching animal feeding data

function FoodsBody() {
  const [searchTerm, setSearchTerm] = useState(""); // Local state for search term
  const { products, isLoading, error, dispatch } = useAnimalFeeding(); // Using the custom hook for fetching data

  // Pagination setup
  const itemsPerPage = 6; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure products is always an array to prevent errors
  const productsArray = Array.isArray(products) ? products : [];

  // Calculate the total number of pages based on the products length
  const totalPages = Math.ceil(productsArray.length / itemsPerPage);

  // Slice the products for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productsArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "SET_LOADING" }); // Dispatch loading action to the state

      // Get the token from localStorage
      const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage under 'authToken'

      if (!token) {
        dispatch({
          type: "SET_ERROR",
          payload: "No authentication token found.",
        });
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/animal-feeding/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        dispatch({ type: "SET_ANIMAL_FEEDING_PRODUCTS", payload: data }); // Store fetched data
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message }); // Dispatch error action if failed
      }
    };

    fetchProducts();
  }, [dispatch]); // Only trigger fetch when dispatch changes

  // Search logic (filter products based on search term)
  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {/* Search bar */}
      <div className="mb-4">
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

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display filtered products */}
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image || Animal2} // Default image if no image provided
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold text-green-700">Tsh {product.price}</p>
                <div className="mt-4 flex justify-between">
                  <a
                    href={`/animal-feeding/products/${product._id}`}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Order Now
                  </a>
                  <a
                    href={`/animal-feeding/product-detail?productId=${product._id}`}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
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
