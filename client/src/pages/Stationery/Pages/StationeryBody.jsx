import Animal1 from ".././../../assets/images/animal1.jpg";
import Animal2 from ".././../../assets/images/animal2.jpg";

import { useState } from "react";

function StationeryBody() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    // Sample data for products
    {
      id: 1,
      name: "samsung notesbook",
      price: 25.99,
      image: { Animal1 },
      description: "High quality dog food.",
    },
    {
      id: 2,
      name: "mirror pen",
      price: 22.49,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 3,
      name: "Star sheets",
      price: 22.49,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 4,
      name: "Booklet",
      price: 500,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 5,
      name: "Pencils",
      price: 200,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 6,
      name: "Exercise Books",
      price: 22400,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
  ];

  return (
    <div>
      <div className="mb-4 submission">
        <input
          type="text"
          placeholder="Search for stationer item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products
          .filter((product) => {
            return searchTerm.toLowerCase() === ""
              ? product
              : product.name.toLowerCase().includes(searchTerm);
          })
          .map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={Animal2}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold text-blue-700">${product.price}</p>
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
          ))}
      </div>
      <div className="flex justify-center m-2">
        <button className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2">
          Previous
        </button>
        <button className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2">
          Next
        </button>
      </div>
    </div>
  );
}

export default StationeryBody;
