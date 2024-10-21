import Footer from '../components/Footer';

const Receipt = () => {
  const handleClick = () => {
    console.log('printing documents');
  };

  return (
    <>
      <section className="receipt">
        <h1>Receipt</h1>
        <p>Work Description: [Description]</p>
        <p>Price: [Price]</p>
        <p>Receipt Number: [Receipt ID]</p>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print Receipt
        </button>
        <a href="/dashboard">Go to Dashboard</a>
      </section>

      <Footer />
    </>
  );
};

export default Receipt;

/**
 * after the order has been submitted into the receipt section of the website redirect user to homepage or see the order submiitted for the user for the website.
 */
