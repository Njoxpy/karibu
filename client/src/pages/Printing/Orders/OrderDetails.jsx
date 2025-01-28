import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to load order details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, token]);

  const handlePrint = async () => {
    if (!order) return;

    try {
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
      doc.text(`Description: ${order.description}`, 20, 55);
      doc.text(`Price Per Item: Tsh ${order.price.toLocaleString()}`, 20, 65);
      doc.text(`Quantity: ${order.quantity}`, 20, 75);
      doc.text(`Contact: ${order.contact}`, 20, 85);
      doc.text(`Category: ${order.category}`, 20, 95);
      doc.text(
        `Total Price: Tsh ${(order.price * order.quantity).toLocaleString()}`,
        20,
        105
      );

      // Line separator after order details
      doc.setDrawColor(0, 123, 255);
      doc.line(20, 110, 190, 110);

      // Footer with Savarrah Green color
      doc.setFontSize(10);
      doc.setTextColor(40, 167, 69); // Savarrah Green
      doc.text("Thank you for your order!", 20, 120);

      // Save the PDF with a custom name
      doc.save(`${order.description}_receipt.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to generate the receipt. Please try again.");
    }
  };

  // Format date and price
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TZS",
    }).format(price);
  };

  // Render loading or error message if the order is not fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-blue-600 animate-pulse">
          Loading order details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-600">No order details found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-blue-700">
                Order Details
              </h1>
              <p className="text-sm text-gray-500">Printing Order</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-800">
                    {order.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Category</h3>
                  <p className="mt-1 text-sm text-gray-800">{order.category}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Order Date
                  </h3>
                  <p className="mt-1 text-sm text-gray-800">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Customer Contact
                  </h3>
                  <p className="mt-1 text-sm text-gray-800">{order.contact}</p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">Quantity</h3>
                  <p className="mt-1 text-sm text-gray-800">
                    {order.quantity} unit(s)
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Unit Price(Per Item)
                  </h3>
                  <p className="mt-1 text-sm text-gray-800">
                    {formatPrice(order.price)}
                  </p>
                </div>
              </div>

              {/* Total Amount Section */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-700">
                    Total Amount
                  </h3>
                  <p className="text-lg font-bold text-blue-700">
                    {formatPrice(order.price * order.quantity)}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Created At
                  </h3>
                  <p className="mt-1 text-sm text-gray-800">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">
                    Last Updated
                  </h3>
                  <p className="mt-1 text-sm text-gray-800">
                    {formatDate(order.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handlePrint}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Print Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default OrderDetails;
