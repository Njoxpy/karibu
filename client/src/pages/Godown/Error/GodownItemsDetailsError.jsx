import { Link } from "react-router-dom";

const GodownItemsDetailsError = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-red-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          404 - Product Not Found
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          We&apos;re sorry, but the product you are looking for does not exist.
        </p>
        <Link
          href="/godown"
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Go Back to Godown main page
        </Link>
      </div>
    </>
  );
};

export default GodownItemsDetailsError;
