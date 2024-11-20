const OrderForm = () => {
  return (
    <>
      <div className="bg-gray-100 p-8 rounded-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Place Your Order
        </h2>

        <form>
          <h1 className="font-bold mb-4 text-gray-600 text-center">Product Name</h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Customer  Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Enter your full name"
              required
            />
          </div>



          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Customer  Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="product"
              className="block text-gray-700 font-semibold mb-2"
            >
              Product
            </label>
            <select
              id="product"
              name="product"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              required
            >
              <option value="" disabled selected>
                Select product
              </option>
              <option value="dog-food">Dog Food</option>
              <option value="cat-food">Cat Food</option>
              <option value="rabbit-food">Rabbit Pellets</option>
              <option value="bird-seed">Bird Seed</option>
              <option value="horse-feed">Horse Feed</option>
              <option value="fish-flakes">Fish Flakes</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-semibold mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Enter quantity"
              required
              min="1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Enter your delivery address"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="preferredDate"
              className="block text-gray-700 font-semibold mb-2"
            >
              Preferred Delivery Date
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              required
            />
          </div>


          <div className="flex justify-between">
            <p className="text-gray-600 font-bold">Total Price: 4000</p>
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderForm;
