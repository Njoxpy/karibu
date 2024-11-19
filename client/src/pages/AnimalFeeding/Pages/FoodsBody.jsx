import { useState } from "react";
import Animal1 from ".././../../assets/images/animal1.jpg";
import Animal2 from ".././../../assets/images/animal2.jpg";

function FoodsBody() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    // Sample data for products
    {
      id: 1,
      name: "Premium Dog Food",
      price: 25_000,
      image: { Animal1 },
      description: "High-quality dog food with essential nutrients.",
      category: "Dog Food",
      stock: 30,
      weight: "5kg",
      brand: "HealthyPaws",
      ingredients: ["Chicken", "Rice", "Omega-3", "Vitamins"],
    },
    {
      id: 2,
      name: "Gourmet Cat Food",
      price: 224_900,
      image: { Animal2 },
      description: "Nutritious cat food made with real fish.",
      category: "Cat Food",
      stock: 50,
      weight: "3kg",
      brand: "WhiskerLickin",
      ingredients: ["Salmon", "Brown Rice", "Omega-6", "Minerals"],
    },
    {
      id: 3,
      name: "Organic Rabbit Pellets",
      price: 1_899_000,
      image: { Animal2 },
      description: "Organic pellets formulated for rabbits.",
      category: "Rabbit Food",
      stock: 20,
      weight: "2kg",
      brand: "BunnyBest",
      ingredients: ["Alfalfa", "Timothy Hay", "Vegetables"],
    },
    {
      id: 4,
      name: "Bird Seed Mix",
      price: 1_299_990,
      image: { Animal1 },
      description: "Seed mix for a variety of pet birds.",
      category: "Bird Food",
      stock: 40,
      weight: "1kg",
      brand: "FeatheredFriends",
      ingredients: ["Sunflower Seeds", "Millet", "Corn", "Oats"],
    },
    {
      id: 5,
      name: "Horse Feed Pellets",
      price: 359_900,
      image: { Animal1 },
      description: "Nutrient-rich pellets for active horses.",
      category: "Horse Food",
      stock: 15,
      weight: "10kg",
      brand: "EquiStrong",
      ingredients: ["Corn", "Barley", "Soybean Meal", "Vitamins"],
    },
    {
      id: 6,
      name: "Fish Flakes",
      price: 149_000,
      image: { Animal2 },
      description: "Flake food for freshwater aquarium fish.",
      category: "Fish Food",
      stock: 60,
      weight: "200g",
      brand: "AquaLife",
      ingredients: ["Fish Meal", "Shrimp", "Spirulina", "Minerals"],
    },
    {
      id: 7,
      name: "Fish Flakes",
      price: 10_490,
      image: { Animal2 },
      description: "Flake food for freshwater aquarium fish.",
      category: "Fish Food",
      stock: 60,
      weight: "200g",
      brand: "AquaLife",
      ingredients: ["Fish Meal", "Shrimp", "Spirulina", "Minerals"],
    },
    {
      id: 8,
      name: "Fish Flakes",
      price: 10.49,
      image: { Animal2 },
      description: "Flake food for freshwater aquarium fish.",
      category: "Fish Food",
      stock: 60,
      weight: "200g",
      brand: "AquaLife",
      ingredients: ["Fish Meal", "Shrimp", "Spirulina", "Minerals"],
    },
    {
      id: 9,
      name: "Fish Flakes",
      price: 104_900,
      image: { Animal2 },
      description: "Flake food for freshwater aquarium fish.",
      category: "Fish Food",
      stock: 60,
      weight: "200g",
      brand: "AquaLife",
      ingredients: ["Fish Meal", "Shrimp", "Spirulina", "Minerals"],
    },
    {
      id: 10,
      name: "Fish Flakes",
      price: 104_900,
      image: { Animal2 },
      description: "Flake food for freshwater aquarium fish.",
      category: "Fish Food",
      stock: 60,
      weight: "200g",
      brand: "AquaLife",
      ingredients: ["Fish Meal", "Shrimp", "Spirulina", "Minerals"],
    },
    {
      id: 11,
      name: "Fish Flakes",
      price: 104_900,
      image: { Animal2 },
      description: "Flake food for freshwater aquarium fish.",
      category: "Fish Food",
      stock: 60,
      weight: "200g",
      brand: "AquaLife",
      ingredients: ["Fish Meal", "Shrimp", "Spirulina", "Minerals"],
    },
    {
      id: 12,
      name: "Fish Flakes",
      price: 104_900,
      image: { Animal2 },
      description: "Flake food for freshwater aquarium fish.",
      category: "Fish Food",
      stock: 60,
      weight: "200g",
      brand: "AquaLife",
      ingredients: ["Fish Meal", "Shrimp", "Spirulina", "Minerals"],
    },
  ];

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
      {currentProducts.length == 0 ? (
        <p>no orders placed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts
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
                  <p className="font-bold text-green-700">Tsh {product.price}</p>
                  <a
                    href={`/animal-feeding/products/${product.id}`}
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
      )}

      <div className="mt-4 flex justify-center">
        {/* Pagination controls */}
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
