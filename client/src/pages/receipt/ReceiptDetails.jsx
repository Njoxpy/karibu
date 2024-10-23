import { Link } from 'react-router-dom';

function ReceiptDetails() {
  const handleClick = () => {
    console.log('printing documents');
  };
  return (
    <>
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h4 className="text-2xl font-bold text-blue-600 mb-4">Order Details</h4>
        <div className="mb-4">
          <p className="font-semibold">Order ID:</p>
          <p className="text-gray-700">23</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Description:</p>
          <p className="text-gray-700">Logo design for a startup company.</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Price:</p>
          <p className="text-gray-700">Tsh 300000</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Status:</p>
          <p className="text-gray-700">pending</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Date Created:</p>
          <p className="text-gray-700">10/10/2024</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">User ID:</p>
          <p className="text-gray-700">12</p>
        </div>

        {/* Receipt Link */}
        <div className="mt-4">
          <button
            className="mt-4 w-full p-2 bg-green-600 hover:bg-green-800 text-white transition-all duration-75"
            onClick={handleClick}
          >
            Print receipt
          </button>
        </div>

        {/* Navigation Button */}
        <div className="mt-4 text-center">
          <Link
            to="/orders"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Return to Orders Page
          </Link>
        </div>
      </div>
    </>
  );
}

export default ReceiptDetails;
