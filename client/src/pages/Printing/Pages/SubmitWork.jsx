import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import "../../../styles/submitWork.css";

function SubmitWork() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [contact, setContact] = useState(0);
  const [category, setCategory] = useState("magazine");

  // Add useState to store the list of receipts
  const [receipts, setReceipts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the order data to be saved
    const orderData = { description, price, quantity, contact, category };

    // Add the new order to the list of receipts
    setReceipts((prevReceipts) => [...prevReceipts, orderData]);

    // Create the PDF for the receipt
    const doc = new jsPDF();

    // Set the font to Helvetica and normal style
    doc.setFont("courier", "normal");

    // Title Section with brand blue color
    doc.setFontSize(18);
    doc.setTextColor(0, 123, 255); // Brand Blue color (rgb)
    doc.text("Order Submission Receipt", 20, 20);

    // Add a line for separation
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 123, 255); // Brand Blue color
    doc.line(20, 25, 190, 25); // Draw line under the title

    // Add the logo on the right side (adjust the x and y positions)
    // Positioning logo on the right

    // Section Title with brand green color
    doc.setTextColor(40, 167, 69); // Brand Green color (rgb)
    doc.setFontSize(14);
    doc.text("Order Details", 20, 40);

    // Background color for each section (White background)
    doc.setFillColor(255, 255, 255); // White background
    doc.rect(20, 45, 170, 10, "F"); // Draw a filled rectangle for background

    // Reset text color for content (Brand Blue)
    doc.setTextColor(0, 123, 255); // Brand Blue color
    doc.setFontSize(12);

    // Add order details with proper spacing
    doc.text(`Description: ${description}`, 20, 55);
    doc.text(`Price: Tsh ${price}`, 20, 65);
    doc.text(`Quantity: ${quantity}`, 20, 75);
    doc.text(`Contact: ${contact}`, 20, 85);
    doc.text(`Category: ${category}`, 20, 95);

    // Add another line for separation (Brand Blue)
    doc.setDrawColor(0, 123, 255); // Brand Blue color
    doc.line(20, 100, 190, 100); // Draw line for separation

    // Footer with brand green color
    doc.setFontSize(10);
    doc.setTextColor(40, 167, 69); // Brand Green color
    doc.text("Thank you for your order!", 20, 110);

    // Optionally add more space or text (e.g., company info or terms)

    // Save the PDF with a custom name
    doc.save("order_submission_receipt.pdf"); // Trigger PDF download

    // Navigate to receipt page and pass the receipts
    navigate("/printing/orders", { state: { receipts } });
  };

  const handleCancel = () => {
    // Optionally reset the form or just navigate back
    setDescription("");
    setPrice(0);
    setCategory("magazine");
    navigate("/printing"); // Change this path to your desired cancellation behavior
  };

  return (
    <>
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
    </>
  );
}

export default SubmitWork;
