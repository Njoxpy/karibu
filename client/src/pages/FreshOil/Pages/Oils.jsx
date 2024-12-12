import { useState } from "react";
import FreshOil1 from ".././../../assets/images/freshOil1.webp";
import FreshOil2 from ".././../../assets/images/avocado.png";

function Oils() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 6; // Items per page for pagination

  const products = [
    // Sample data for fresh oils
    { id: 1, name: "Olive Oil", price: 25000, image: FreshOil1, description: "Cold-pressed extra virgin olive oil." },
    { id: 2, name: "Coconut Oil", price: 2200, image: FreshOil2, description: "Organic, virgin coconut oil." },
    { id: 3, name: "Avocado Oil", price: 30000, image: FreshOil2, description: "High-quality avocado oil, perfect for cooking." },
    { id: 4, name: "Sunflower Oil", price: 15500, image: FreshOil2, description: "Refined sunflower oil for everyday use." },
    { id: 5, name: "Peanut Oil", price: 18400, image: FreshOil2, description: "Pure peanut oil with a high smoke point." },
    { id: 6, name: "Sesame Oil", price: 2200, image: FreshOil2, description: "Cold-pressed sesame oil with rich flavor." },
  ];

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
          <div
            key={product.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-yellow-700">Tsh {product.price}</p>

              <div className="flex justify-between">
                <a
                  href={`/freshOil/products/${product.id}`}
                  className="mt-4 inline-block bg-yellow-500 text-white py-2 px-4 rounded"
                >
                  Order Now
                </a>
                <a
                  href={`/freshOil/product-detail?productId=${product.id}`}
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
