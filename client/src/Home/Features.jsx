const Features = () => {
  return (
    <>
      <div className="p-4">
        <section className="features">
          <h2>Our Features</h2>
          <div className="feature">
            {/* <img src="icon1.png" alt="User-Friendly Submission"> */}
            <h3>User-Friendly Submission</h3>
            <p>Submit work descriptions with ease.</p>
          </div>
          <div className="feature">
            {/* <img src="icon2.png" alt="Instant Receipts"> */}
            <h3>Instant Receipts</h3>
            <p>Get immediate receipts for your submissions.</p>
          </div>
          <div className="feature">
            {/* <img src="icon3.png" alt="Order Tracking"> */}
            <h3>Order Tracking</h3>
            <p>Keep track of your submitted orders effortlessly.</p>
          </div>
          <div className="feature">
            {/* <img src="icon4.png" alt="Support"> */}
            <h3>Support</h3>
            <p>Dedicated support to assist you at every step.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
