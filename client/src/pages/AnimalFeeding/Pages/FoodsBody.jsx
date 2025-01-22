import { useState, useEffect } from "react";
import Animal2 from "../../../assets/images/animal2.jpg";
import { getToken } from "../../../services/token";

const FoodsBody = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = getToken();

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/animal-feeding/products?name=${searchTerm}`,
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
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
        console.log(error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

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
          placeholder="Search for animal feeding products ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image ? `${baseURL}${product.image}` : Animal2}
                loading="lazy"
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">Idadi: {product.quantity}</p>
                <p className="text-gray-600">Nutrients: {product.nutrients}</p>
                <p className="font-bold text-green-700">Tsh {product.price}</p>
                <div className="mt-4 flex justify-between">
                  <a
                    href={`/animal-feeding/products/${product._id}`}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center m-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-green-500 text-white py-1 px-2 rounded transition duration-300"
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Page <strong>{currentPage}</strong> of{" "}
          <strong>{Math.ceil(products.length / itemsPerPage)}</strong>
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
          className="bg-green-500 text-white py-1 px-2 rounded transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FoodsBody;
