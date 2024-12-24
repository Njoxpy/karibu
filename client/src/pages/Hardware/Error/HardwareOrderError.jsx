import { Link } from "react-router-dom";

const HardwareOrderError = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-red-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          404 - Order Not Found
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          We&apos;re sorry, the order you are looking for does not exist.
        </p>
        <Link
          href="/hardware"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go Back to hardware main page
        </Link>
      </div>
    </>
  );
};

export default HardwareOrderError;
