import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../../../styles/submitWork.css";

function SubmitWork() {
  const navigate = useNavigate();

  // State variables for form fields
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [contact, setContact] = useState(0);
  const [category, setCategory] = useState("magazine");

  // State for storing receipts (if needed)
  const [receipts, setReceipts] = useState([]);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for storing the generated PDF data
  const [pdfReceipt, setPdfReceipt] = useState(null);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation: Check if required fields are filled and valid
    if (!description || price <= 0 || quantity <= 0 || contact <= 0) {
      alert("Please fill in all fields with valid values.");
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

      // Add the order to the receipts array (if needed)
      setReceipts((prevReceipts) => [...prevReceipts, data]);

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

      // Background color for the order details section (white)
      doc.setFillColor(255, 255, 255);
      doc.rect(20, 40, 170, 10, "F");

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
      alert("Error creating order: " + error.message);
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
    <div className="p-4">
      <section className="submission">
        <h1 className="font-bold text-center text-blue-600">
          Submit Your Work
        </h1>
        <form id="workSubmissionForm" onSubmit={handleSubmit}>
          <div className="p-2">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="mt-2 w-full rounded-lg align-top shadow-sm sm:text-sm border border-gray-400"
              rows="4"
              placeholder="Enter Description for The Order..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="p-2">
            <label htmlFor="price" className="font-bold text-gray-700">
              Price in Tsh Per Item:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              className="border border-gray-400 rounded w-full p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="p-2">
            <label htmlFor="quantity" className="font-bold text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              required
              className="border border-gray-400 rounded w-full p-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="p-2">
            <label htmlFor="contact" className="font-bold text-gray-700">
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              required
              className="border border-gray-400 rounded w-full p-2"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="p-2">
            <label htmlFor="category" className="font-bold text-gray-700">
              Category
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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

          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Work
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Submission
            </button>
          </div>
        </form>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-center text-xl font-bold text-blue-600">
              Order Submitted Successfully!
            </h2>
            <p className="mt-4 text-center text-gray-700">
              Your order has been submitted successfully. A receipt has been
              generated.
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={downloadReceipt}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Download Receipt
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
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
