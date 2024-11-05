import React from "react";

import Animal1 from "../../../assets/images/animal1.jpg";
import Animal2 from "../../../assets/images/animal2.jpg";
import Footer from "../../../components/Footer";
import FoodDetailsPage from "./FoodDetails";

const AnimalFeeding = () => {
  const products = [
    // Sample data for products
    {
      id: 1,
      name: "Dog Food",
      price: 25.99,
      image: { Animal1 },
      description: "High quality dog food.",
    },
    {
      id: 2,
      name: "Cat Food",
      price: 22.49,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 2,
      name: "Cat Food",
      price: 22.49,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 2,
      name: "Cat Food",
      price: 22.49,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 2,
      name: "Cat Food",
      price: 22.49,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
    {
      id: 2,
      name: "Cat Food",
      price: 22.49,
      image: { Animal2 },
      description: "Nutritious cat food.",
    },
  ];

  return (
    <>
      <div className="p-4 bg-green-50">
        <h1 className="text-2xl font-bold mb-6">Animal Feeding Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
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
                <p className="font-bold text-green-700">${product.price}</p>
                <a
                  href={`/animal-feeding/food/${product.id}`}
                  className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded"
                >
                  Order Now
                </a>
                <a
                  href={`/animal-feeding/product-detail?productId=${product.id}`}
                  className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded ml-2"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FoodDetailsPage />
      <Footer />
    </>
  );
};

export default AnimalFeeding;
