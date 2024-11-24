import { useState } from "react";
import LaptopImage from ".././../../assets/images/mouse.jpg"; // Example hardware image
import MouseImage from ".././../../assets/images/mouse.jpg";   // Example hardware image
import KeyboardImage from ".././../../assets/images/mouse.jpg"; // Example hardware image

function Hardwares() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for hardware products
  const products = [
    { id: 1, name: "Samsung Laptop", price: 25000.99, image: LaptopImage, description: "High-performance laptop for work and gaming." },
    { id: 2, name: "Wireless Mouse", price: 7000, image: MouseImage, description: "Ergonomic wireless mouse for comfortable usage." },
    { id: 3, name: "Mechanical Keyboard", price: 25000, image: KeyboardImage, description: "Durable mechanical keyboard with RGB backlighting." },
    { id: 4, name: "USB Flash Drive", price: 15000, image: LaptopImage, description: "Fast data transfer with 64GB storage capacity." },
    { id: 5, name: "External Hard Drive", price: 50000, image: LaptopImage, description: "Portable external hard drive with 1TB storage." },
    { id: 6, name: "Laptop Cooling Pad", price: 25000, image: MouseImage, description: "Cooling pad with multiple fan speeds for laptops." },
    { id: 7, name: "HDMI Cable", price: 7500, image: KeyboardImage, description: "High-speed HDMI cable for clear video and audio." },
    { id: 8, name: "USB-C Adapter", price: 14000, image: LaptopImage, description: "USB-C to HDMI, USB-A, and Ethernet adapter." },
    { id: 9, name: "Wireless Headphones", price: 9900, image: MouseImage, description: "Noise-cancelling wireless headphones with Bluetooth." },
    { id: 10, name: "Portable Power Bank", price: 60000, image: KeyboardImage, description: "Compact power bank with 20,000mAh capacity." },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

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
          placeholder="Search for hardware items ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts
          .filter((product) => {
            return searchTerm.toLowerCase() === ""
              ? product
              : product.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((product) => (
            <div key={product.id} className="border rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold text-blue-700">Tsh {product.price}</p>
                <a
                  href={`/hardware/products/${product.id}`}
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Order Now
                </a>
                <a
                  href={`/hardwares/product-detail?productId=${product.id}`}
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded ml-2"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center m-2">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Hardwares;
