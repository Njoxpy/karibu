import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer"; // Import your Footer component

const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Assuming order data is passed via the location state
  const { description, price, quantity, contact, category } = location.state || {};

  // Default data if no order found
  const orderData = description
    ? { description, price, quantity, contact, category }
    : null;

  const handleGoHome = () => {
    navigate("/"); // Redirect user to homepage
  };

  return (
    <>
      <section className="receipt p-4">
        <h3 className="font-bold text-2xl text-center text-blue-600">
          Order Receipt
        </h3>
        {orderData ? (
          <div className="order-details mt-6">
            <h4 className="font-semibold">Order Details:</h4>
            <div className="mt-4">
              <p><strong>Description:</strong> {orderData.description}</p>
              <p><strong>Price:</strong> Tsh {orderData.price}</p>
              <p><strong>Quantity:</strong> {orderData.quantity}</p>
              <p><strong>Contact:</strong> {orderData.contact}</p>
              <p><strong>Category:</strong> {orderData.category}</p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleGoHome}
                className="bg-primary text-white px-6 py-2 rounded-lg"
              >
                Go Back to Homepage
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <p>No order data found.</p>
            <button
              onClick={handleGoHome}
              className="bg-primary text-white px-6 py-2 rounded-lg"
            >
              Go Back to Homepage
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Receipt;
