const OrdersNotFound = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20zm-1-7v-2h2v2h-2zm0-4V7h2v2h-2z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No orders found
        </h3>
      </div>
    </div>
  );
};

export default OrdersNotFound;
