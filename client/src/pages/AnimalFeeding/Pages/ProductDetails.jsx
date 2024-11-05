import React from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../Error/ErrorPage";

const ProductDetail = () => {
  const { productId } = useParams();

  // Sample data for products (Replace with actual data fetching)
  const products = [
    {
      id: 1,
      name: "Dog Food",
      price: 25.99,
      description: "High quality dog food.",
      image: "/images/dog-food.jpg",
    },
    {
      id: 2,
      name: "Cat Food",
      price: 22.49,
      description: "Nutritious cat food.",
      image: "/images/cat-food.jpg",
    },
    // Add more products as needed
  ];

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="p-4 bg-green-50">
        <h1 className="text-2xl font-bold mb-6">{product.name}</h1>
        <div className="flex">
          <img
            src={product.image}
            alt={product.name}
            className="w-1/3 h-64 object-cover mr-4"
          />
          <div className="w-2/3">
            <p className="mb-4">{product.description}</p>
            <p className="font-bold text-green-700">Price: ${product.price}</p>
            <a
              href={`/animal-feeding/order/${product.id}`}
              className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
