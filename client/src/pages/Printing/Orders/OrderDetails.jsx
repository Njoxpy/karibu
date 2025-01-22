import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const token = getToken();
  const navigate = useNavigate();

  // Fetch order details from the backend using the order ID
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/printing/orders/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
    doc.setFont("tahoma", "normal");

    // Title Section with Savarrah Printing brand blue color
    doc.setFontSize(22);
    doc.setTextColor(0, 123, 255); // Savarrah Blue color
    doc.text("Savarrah Printing", 20, 20);

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
    doc.text(`Total Price: Tsh ${order.price * order.quantity}`, 20, 105);

    // Line separator after order details
    doc.setDrawColor(0, 123, 255);
    doc.line(20, 100, 190, 100);

    // Footer with brand green color
    doc.setFontSize(10);
    doc.setTextColor(40, 167, 69);
    doc.text("Thank you for your order!", 20, 110);

    // Save the PDF with a custom name
    doc.save(`${order.description}_receipt.pdf`);
  };

  // Render loading or error message if the order is not fetched
  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg text-blue-500">Loading order details...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TSH",
    }).format(price);
  };

  return (
    <>
      <>
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5M12 19l-7-7 7-7"
              />
            </svg>
            Back to Orders
          </button>

          <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold">Order Details</h1>
              <p className="text-sm text-gray-500">Printing Order</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm  text-gray-500 font-bold">
                    Description
                  </h3>
                  <p className="mt-1 text-sm font-mono">{order.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Order ID</h3>
                  <p className="mt-1 text-sm font-mono">{order.orderId}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Order Date
                  </h3>
                  <p className="mt-1 text-sm">{formatDate(order.createdAt)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Customer Contact
                  </h3>
                  <p className="mt-1 text-sm font-mono">{order.contact}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">Quantity</h3>
                  <p className="mt-1 text-sm">{order.quantity} unit(s)</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Unit Price
                  </h3>
                  <p className="mt-1 text-sm">
                    {formatPrice(order.totalPrice)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Total Amount</h3>
                  <p className="text-lg font-bold">
                    {formatPrice(order.totalPrice)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Created At
                  </h3>
                  <p className="mt-1 text-sm">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Last Updated
                  </h3>
                  <p className="mt-1 text-sm">{formatDate(order.updatedAt)}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-4">
              <button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                onClick={handlePrint}
              >
                Print Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
      <Footer />
    </>
  );
}

export default OrderDetails;
