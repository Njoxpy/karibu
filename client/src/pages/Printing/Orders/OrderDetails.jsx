import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import Footer from "../../../components/Footer";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  // Fetch order details from the backend using the order ID
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/printing/orders/${id}`);
        const data = await response.json();
        if (response.ok) {
          setOrder(data);
        } else {
          console.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handlePrint = () => {

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
    doc.text(`Description: ${order.description}`, 20, 55);
    doc.text(`Price: Tsh ${order.price}`, 20, 65);
    doc.text(`Quantity: ${order.quantity}`, 20, 75);
    doc.text(`Contact: ${order.contact}`, 20, 85);
    doc.text(`Category: ${order.category}`, 20, 95);
    doc.text(`Total Price: Tsh ${order.price * order.quantity}`, 20, 95);

    // Line separator after order details
    doc.setDrawColor(0, 123, 255);
    doc.line(20, 100, 190, 100);

    // Footer with brand green color
    doc.setFontSize(10);
    doc.setTextColor(40, 167, 69);
    doc.text("Thank you for your order!", 20, 110);

    // Save the PDF with a custom name
    doc.save(`${order.description}_receipt.pdf`);
  }

  // Render loading or error message if the order is not fetched
  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg text-blue-500">Loading order details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gray-700 p-8 rounded-xl shadow-2xl">
          <h3 className="text-4xl font-bold text-blue-500 text-center mb-8">Order Details</h3>
          <div className="space-y-6">
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Order ID</h4>
              <p className="text-lg text-gray-300">{order._id}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Product Name</h4>
              <p className="text-lg text-gray-300">{order.description}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Quantity Ordered</h4>
              <p className="text-lg text-gray-300">{order.quantity}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Price per Item</h4>
              <p className="text-lg text-gray-300">{order.price}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Contact</h4>
              <p className="text-lg text-gray-300">{order.contact}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Total Price</h4>
              <p className="text-lg text-gray-300">Tsh {order.totalPrice}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrint}
            >
              Print Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderDetails;
