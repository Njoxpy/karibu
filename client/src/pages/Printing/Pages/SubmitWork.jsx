import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../../../styles/submitWork.css";
import { usePrinting } from "../../../hooks/printing/usePrinting";

function SubmitWork() {
  const navigate = useNavigate();
  const { dispatch } = usePrinting();

  // State variables for form fields
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [contact, setContact] = useState(0);
  const [category, setCategory] = useState("magazine");

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for storing the generated PDF data
  const [pdfReceipt, setPdfReceipt] = useState(null);

  // State for error messages
  const [error, setError] = useState("");

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setError("");

    // Simple validation: Check if required fields are filled and valid
    if (!description || price <= 0 || quantity <= 0 || contact <= 0) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    // Create the order data object
    const orderData = {
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      contact,
      category,
    };

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("authToken");

      // Send the order data to the backend API with Bearer token in the headers
      const response = await fetch(
        "http://localhost:5000/api/v1/printing/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Bearer token here
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      // Dispatch to add the order to the state
      dispatch({ type: "ADD_PRINTING_ORDER", payload: data }); // Add the order from response

      // Generate the PDF receipt using jsPDF
      const doc = new jsPDF();
      doc.setFont("tahoma", "normal");

      // Title Section with Savarrah Printing brand blue color
      doc.setFontSize(22);
      doc.setTextColor(0, 123, 255); // Savarrah Blue color
      doc.text("Savarrah Printing", 20, 20);

      // Line separator
      doc.setLineWidth(0.5);
      doc.setDrawColor(0, 123, 255);
      doc.line(20, 25, 190, 25);

      // Section title with white background and brand green color
      doc.setTextColor(255, 255, 255); // White text on blue background
      doc.setFontSize(14);
      doc.setFillColor(0, 123, 255); // Brand Blue background for title
      doc.rect(20, 30, 170, 10, "F");
      doc.text("Order Details", 20, 37);

      // Reset text color for the order content (Savarrah Blue)
      doc.setTextColor(0, 123, 255);
      doc.setFontSize(12);

      // Add order details to the PDF
      doc.text(`Description: ${description}`, 20, 55);
      doc.text(`Price Per Item: Tsh ${price}`, 20, 65);
      doc.text(`Quantity: ${quantity}`, 20, 75);
      doc.text(`Contact: ${contact}`, 20, 85);
      doc.text(`Category: ${category}`, 20, 95);
      doc.text(`Total Price: Tsh ${price * quantity}`, 20, 105);

      // Line separator after order details
      doc.setDrawColor(0, 123, 255);
      doc.line(20, 110, 190, 110);

      // Footer with Savarrah Green color
      doc.setFontSize(10);
      doc.setTextColor(40, 167, 69); // Savarrah Green
      doc.text("Thank you for your order!", 20, 120);

      // Save the PDF in the state as a blob
      const pdfOutput = doc.output("blob"); // Save the PDF as a blob
      setPdfReceipt(pdfOutput); // Save the blob for later download

      // Set the modal visibility to true
      setIsModalOpen(true);
    } catch (error) {
      setError("Error creating order: " + error.message);
    }
  };

  // Handle download PDF
  const downloadReceipt = () => {
    if (pdfReceipt) {
      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfReceipt); // Create an object URL for the PDF blob
      link.download = `${description}_receipt.pdf`; // Set the filename
      link.click(); // Trigger the download
    }
  };

  // Cancel form submission and reset fields
  const handleCancel = () => {
    setDescription("");
    setPrice(0);
    setCategory("magazine");
    setQuantity(0);
    setContact(0);
    navigate("/printing"); // Redirect to the printing page
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <section className="submission bg-white p-6 rounded-lg shadow-md">
        <h1 className="font-bold text-center text-2xl text-blue-600 mb-6">
          Submit Your Work
        </h1>

        <form id="workSubmissionForm" onSubmit={handleSubmit}>
          {/* Description Field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              rows="4"
              placeholder="Enter Description for The Order..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Price Field */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block font-bold text-gray-700 mb-2"
            >
              Price in Tsh Per Item:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Quantity Field */}
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block font-bold text-gray-700 mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Contact Field */}
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block font-bold text-gray-700 mb-2"
            >
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Category Field */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block font-bold text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="books">Books</option>
              <option value="magazine">Magazine</option>
              <option value="clothing">Clothing</option>
              <option value="cards">Cards</option>
              <option value="banners">Banners</option>
              <option value="cups">Cups</option>
              <option value="bags">Bags</option>
            </select>
          </div>
          {/* Display error message if any */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Submit Work
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-center text-xl font-bold text-blue-600 mb-4">
              Order Submitted Successfully!
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Your order has been submitted successfully. A receipt has been
              generated.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={downloadReceipt}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
              >
                Download Receipt
              </button>
              <button
                onClick={closeModal}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmitWork;
