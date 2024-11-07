function Filter() {
  return (
    <div className="flex p-4">
      <h3 className="p-4">Filter By</h3>
      <div className="space-y-2">
        <details className="overflow-hidden rounded border border-gray-300 white:border-gray-600 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition white:bg-gray-900 white:text-white">
            <span className="text-sm font-medium"> Availability </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white white:border-gray-700 white:bg-gray-900">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700 white:text-gray-200">
                {" "}
                0 Selected{" "}
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4 white:text-white pl-4"
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4 white:border-gray-700">
              <li>
                <label
                  htmlFor="FilterInStock"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterInStock"
                    className="size-5 rounded border-gray-300 white:border-gray-600 white:bg-gray-900 white:focus:ring-offset-gray-900"
                  />

                  <span className="text-sm font-medium text-gray-700 white:text-gray-200">
                    Category
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterPreOrder"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="filterPrice"
                    className="size-5 rounded border-gray-300 white:border-gray-600 white:bg-gray-900 white:focus:ring-offset-gray-900"
                  />

                  <span className="text-sm font-medium text-gray-700 white:text-gray-200">
                    Price
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
}

export default Filter;
