
import Footer from '../../../components/Footer';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  // Order data
  const order = {
    orderId: 1,
    productName: 'Animal Feed A',
    amountOrdered: 2,
    totalPrice: 4000
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Order Details</h1>

          {/* Order Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
            {/* Order ID */}
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Order ID:</span>
              <span className="text-gray-800">#{order.orderId}</span>
            </div>

            {/* Product Name */}
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Product Name:</span>
              <span className="text-gray-800">{order.productName}</span>
            </div>

            {/* Amount Ordered */}
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Amount Ordered:</span>
              <span className="text-gray-800">{order.amountOrdered}</span>
            </div>

            {/* Total Price */}
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Total Price:</span>
              <span className="text-gray-800 font-semibold">₦{order.totalPrice}</span>
            </div>
          </div>

          {/* Button or Next Step */}
          <div className="mt-6 flex justify-center">
            <Link to={"/printing/orders"}>
              <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                View More Orders
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
