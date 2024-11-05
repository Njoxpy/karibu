import Animal2 from ".././../../assets/images/animal2.jpg";

import { useState } from "react";
import Footer from "../../../components/Footer";

const ProductDetails = () => {
  // Sample product details (Replace with actual data)
  const product = {
    id: 1,
    name: "Dog Food",
    price: 25.99,
    description: "High-quality dog food, rich in nutrients.",
    image: "/images/dog-food.jpg",
  };

  // State for quantity and cart
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (quantity > 0) {
      // Check if the product is already in the cart
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Update the quantity if the product already exists
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + parseInt(quantity) }
              : item
          )
        );
      } else {
        // Add new product to the cart
        setCart([...cart, { id: product.id, quantity: parseInt(quantity) }]);
      }

      alert(`${quantity} ${product.name} added to cart.`);
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 bg-green-50">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img
          src={Animal2}
          alt={product.name}
          className="w-1/2 h-64 object-cover mb-4"
        />
        <p className="mb-4">{product.description}</p>
        <p className="font-bold text-green-700">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="">
          Nutrients:<b> Protein, Vitamin3</b>
        </p>
        <div className="mt-4 flex items-center">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded px-3 py-1 mr-2 w-20"
          />
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
