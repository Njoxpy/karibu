import { Link } from "react-router-dom";

const HardwareDetailsError = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-red-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          404 - Product Not Found
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          We&apos;re sorry, the product you are looking for does not exist.
        </p>
        <Link
          href="/hardware/orders"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go Back to hardware orders page
        </Link>
      </div>
    </>
  );
};

export default HardwareDetailsError;
