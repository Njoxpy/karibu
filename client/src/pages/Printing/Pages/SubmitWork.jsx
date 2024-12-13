import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For page redirection
import { jsPDF } from "jspdf"; // For generating PDF receipts
import "../../../styles/submitWork.css"; // Custom styling

function SubmitWork() {
  const navigate = useNavigate(); // To navigate between pages

  // State variables for form fields
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [contact, setContact] = useState(0);
  const [category, setCategory] = useState("magazine");

  // State for storing receipts
  const [receipts, setReceipts] = useState([]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation: Check if required fields are filled and valid
    if (!description || price <= 0 || quantity <= 0 || contact <= 0) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    // Create the order data object
    const orderData = { description, price, quantity, contact, category };

    // Add the order to the receipts array
    setReceipts((prevReceipts) => [...prevReceipts, orderData]);

    // Generate the PDF receipt using jsPDF
    const doc = new jsPDF();
    doc.setFont("courier", "normal");

    // Title Section with brand blue color
    doc.setFontSize(18);
    doc.setTextColor(0, 123, 255); // Brand Blue color
    doc.text("Order Submission Receipt", 20, 20);

    // Line separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 123, 255);
    doc.line(20, 25, 190, 25);

    // Section title with brand green color
    doc.setTextColor(40, 167, 69); // Brand Green color
    doc.setFontSize(14);
    doc.text("Order Details", 20, 40);

    // Background color for the order details section (white)
    doc.setFillColor(255, 255, 255);
    doc.rect(20, 45, 170, 10, "F");

    // Reset text color for the order content (Brand Blue)
    doc.setTextColor(0, 123, 255);
    doc.setFontSize(12);

    // Add order details to the PDF
    doc.text(`Description: ${description}`, 20, 55);
    doc.text(`Price: Tsh ${price}`, 20, 65);
    doc.text(`Quantity: ${quantity}`, 20, 75);
    doc.text(`Contact: ${contact}`, 20, 85);
    doc.text(`Category: ${category}`, 20, 95);

    // Line separator after order details
    doc.setDrawColor(0, 123, 255);
    doc.line(20, 100, 190, 100);

    // Footer with brand green color
    doc.setFontSize(10);
    doc.setTextColor(40, 167, 69);
    doc.text("Thank you for your order!", 20, 110);

    // Save the PDF with a custom name
    doc.save("order_submission_receipt.pdf");

    // Navigate to the orders page and pass the receipts state
    navigate("/printing/orders", { state: { receipts } });
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

  return (
    <div className="p-4">
      <section className="submission">
        <h1 className="font-bold text-center text-blue-600">Submit Your Work</h1>
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
              Price in Tsh:
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
              type="number"
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
    </div>
  );
}

export default SubmitWork;
