// src/pages/FoodDetailsPage.js

import React from "react";
import { useParams } from "react-router-dom";

const FoodDetailsPage = () => {
  const { productId } = useParams();

  // Sample data for products (Replace with actual data fetching)
  const products = [
    {
      id: 1,
      name: "Dog Food",
      price: 25.99,
      description: "High-quality dog food, rich in nutrients.",
      image: "/images/dog-food.jpg",
    },
    {
      id: 2,
      name: "Cat Food",
      price: 22.49,
      description: "Nutritious cat food with vitamins.",
      image: "/images/cat-food.jpg",
    },
    // Add more products as needed
  ];

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <div className="text-center p-4">Product not found.</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-green-50">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-1/2 h-64 object-cover mb-4"
      />
      <p className="mb-4">{product.description}</p>
      <p className="font-bold text-green-700">
        Price: ${product.price.toFixed(2)}
      </p>
      <a
        href={`/cart/add/${product.id}`}
        className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-green-600"
      >
        Add to Cart
      </a>
    </div>
  );
};

export default FoodDetailsPage;
