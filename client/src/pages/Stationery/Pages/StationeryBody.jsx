import Animal1 from ".././../../assets/images/pen.jpg";
import Animal2 from ".././../../assets/images/booklet.jpg";
import { useState } from "react";

function StationeryBody() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products = [
    // Sample data for products
    {
      id: 1,
      name: "Samsung Notebook",
      price: 25900,
      image: Animal1,
      description: "High quality notebook for professionals.",
      category: "Notebooks",
    },
    {
      id: 2,
      name: "Mirror Pen",
      price: 2200,
      image: Animal2,
      description: "A stylish pen with a mirror finish.",
      category: "Pens",
    },
    {
      id: 3,
      name: "Star Sheets",
      price: 2200,
      image: Animal2,
      description: "Quality sheets for printing and writing.",
      category: "Paper",
    },
    {
      id: 4,
      name: "Booklet",
      price: 500,
      image: Animal2,
      description: "A handy booklet for notes.",
      category: "Books",
    },
    {
      id: 5,
      name: "Pencils",
      price: 200,
      image: Animal2,
      description: "Set of pencils for everyday use.",
      category: "Stationery",
    },
    {
      id: 6,
      name: "Exercise Books",
      price: 22400,
      image: Animal2,
      description: "Exercise books for students and professionals.",
      category: "Books",
    },
  ];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <div>
        <div className="mb-4 submission">
          <input
            type="text"
            placeholder="Search for stationery items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Updates the search term state
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
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
                  <p className="font-bold text-blue-700">Tsh {product.price}</p>
                  <div className="">
                    <a
                      href={`/stationery/products/${product.id}`}
                      className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Order Now
                    </a>
                    <a
                      href={`/stationery/product-detail?productId=${product.id}`}
                      className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded ml-2"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products found for &quot;{searchTerm}&quot;</p>
          )}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center m-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2"
          >
            Previous
          </button>
          <span className="mt-4 inline-block text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default StationeryBody;
