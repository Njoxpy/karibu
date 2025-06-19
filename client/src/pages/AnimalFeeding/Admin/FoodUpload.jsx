import { useState } from "react";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";
import { useAnimalFeeding } from "../../../hooks/animalFeeding/useAnimalFeeding";

const FoodUpload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nutrients, setNutrients] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
        // create variable for api url
     const baseURL = import.meta.env.VITE_API_URL;

  const URL = `${baseURL}/animal-feeding/products`;
  
  const token = getToken();

  const { dispatch } = useAnimalFeeding();

  const validateInputs = () => {
    if (!name.trim()) return "Product name is required.";
    if (!description.trim()) return "Description is required.";
    if (!nutrients.trim()) return "Nutrients are required.";
    if (!price || isNaN(price) || Number(price) <= 0)
      return "Valid price is required.";
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0)
      return "Valid quantity is required.";
    if (!image) return "Product image is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("nutrients", nutrients);
    formData.append("image", image);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch({ type: "ADD_ANIMAL_FEEDING_PRODUCT", payload: data });

      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setNutrients("");
      setImage(null);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 py-12 px-6 sm:px-10 lg:px-12">
        <h1 className="text-3xl font-semibold text-center text-green-800 mb-8">
          Upload New Animal Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="product-name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="product-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Mashudu"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Description of the product"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price (Tsh)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 2500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 100"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="nutrients"
                className="block text-sm font-medium text-gray-700"
              >
                Nutrients
              </label>
              <input
                type="text"
                id="nutrients"
                value={nutrients}
                onChange={(e) => setNutrients(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Protein, Vitamins"
                required
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <input
                type="file"
                id="image"
                accept=".png, .jpeg, .gif, .jpg"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded-md text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Product Added Successfully!
            </h2>
            <button
              onClick={() => setSuccess(false)}
              className="py-2 px-6 bg-green-600 text-white text-sm rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FoodUpload;
