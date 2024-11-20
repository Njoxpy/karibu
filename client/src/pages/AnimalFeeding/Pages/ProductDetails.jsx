import React from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import Animal from "../../../assets/images/animal1.jpg"

function ProductDetails() {
  const product = {
    name: "Product A",
    price: "Tsh 999 900",
    description: "A brief description of the product's features.",
    category: "Animal Food",
    subcategory: "Dry Food",
    imageUrl: { Animal },
    specifications: {
      weight: "2 kg",
      dimensions: "12x6x4 cm",
      ingredients: "Wheat, Corn",
    },
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Breadcrumbs */}
        <nav className="text-gray-600 mb-6">
          <span className="text-green-600 hover:underline cursor-pointer">Home</span> &gt;
          <span className="text-green-600 hover:underline cursor-pointer">Animal Feeding</span> &gt; {product.name}
        </nav>

        {/* Product Details */}
        <div className="flex gap-12">
          {/* Product Image */}
          <div className="w-1/2">
            <img
              src={Animal}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Product Info */}
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold text-green-600 mb-4">{product.name}</h1>
            <p className="text-xl text-gray-800 mb-4">{product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <p className="text-gray-600 mb-4">
              <strong>Category:</strong> {product.category}  {product.subcategory}
            </p>

            {/* Specifications Table */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
              <table className="table-auto w-full text-left">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-4 py-2 font-medium text-gray-600">{key}</td>
                      <td className="px-4 py-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                Add your comment
              </label>
              <div className="mt-2">
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex gap-4 items-center mb-6">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="border border-gray-300 rounded-md p-2 w-16"
              />
              <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                Add to Cart
              </button>

            </div>
            <p className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 cursor-pointer"><Link to={"/animal-feeding/cart"}>view cart</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
