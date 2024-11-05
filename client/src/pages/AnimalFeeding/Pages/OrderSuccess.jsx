import React from "react";
import Footer from "../../../components/Footer";

function OrderSuccess() {
  return (
    <>
      <div className="p-4 bg-green-50">
        <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
        <p className="mb-4">
          Thank you for your order! Your order has been placed successfully.
        </p>
        <p className="font-bold">
          You will receive an email confirmation shortly.
        </p>
        <a
          href="/animal-feeding"
          className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded"
        >
          Go to Animal Feeding Page
        </a>
      </div>
      <div className="bottom-0 w-full fixed">
        <Footer />
      </div>
    </>
  );
}

export default OrderSuccess;
