function Cart() {
  return (
    <>
      <div className="submission">
        <div
          className="relative w-screen max-w-sm border border-blue-500 bg-white px-4 py-8 sm:px-6 lg:px-8"
          aria-modal="true"
          role="dialog"
          tabIndex="-1"
        >
          <button className="absolute end-4 top-4 text-blue-500 transition hover:scale-110">
            <span className="sr-only">Close cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-4 space-y-6">
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                  alt=""
                  className="size-16 rounded object-cover"
                />

                <div>
                  <h3 className="text-sm text-blue-700">Basic Tee 6-Pack</h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Size:</dt>
                      <dd className="inline">XXS</dd>
                    </div>
                    <div>
                      <dt className="inline">Color:</dt>
                      <dd className="inline">White</dd>
                    </div>
                  </dl>
                </div>
              </li>
            </ul>

            <div className="space-y-4 text-center">
              <a
                href="#"
                className="block rounded border border-blue-500 px-5 py-3 text-sm text-blue-500 transition hover:ring-1 hover:ring-blue-400"
              >
                View my cart (2)
              </a>

              <a
                href="#"
                className="block rounded bg-blue-700 px-5 py-3 text-sm text-white transition hover:bg-blue-600"
              >
                Checkout
              </a>

              <a
                href="#"
                className="inline-block text-sm text-green-500 underline underline-offset-4 transition hover:text-green-600"
              >
                Continue shopping
              </a>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Cart;
