import Footer from "../../../components/Footer";

function OrderSuccessPrinting() {
  return (
    <>
      <div className="p-4 bg-blue-50">
        <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
        <p className="mb-4">
          Thank you for your order! Your order has been placed successfully.
        </p>
        <p className="font-bold">
          You will receive an email confirmation shortly.
        </p>
        <a
          href="/printing/submit"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go to Submit Page to submit other orders
        </a>
      </div>
      <Footer />
    </>
  );
}

export default OrderSuccessPrinting;
