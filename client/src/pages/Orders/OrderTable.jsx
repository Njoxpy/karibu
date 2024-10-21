import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

function OrderTable() {
  const URL = 'http://localhost:3003/orders';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('response not ok!');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  if (loading) {
    return <div className="text-yellow-800 p-4">Loading... Please wait.</div>;
  }
  if (error) {
    return (
      <div className="text-red-600 p-4 font-bold">
        Error: There was a problem loading data.
        <div
          role="alert"
          className="rounded border-s-4 border-red-500 bg-red-50 p-4"
        >
          <div className="flex items-center gap-2 text-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <strong className="block font-medium">
              {' '}
              Something went wrong{' '}
            </strong>
          </div>

          <p className="mt-2 text-sm text-red-700">
            There was a problem with the ednpoint for fetching data into the
            website try gain later, refresh the page :)
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 w-full">
        <h4 className="text-center font-bold p-2 text-blue-600">Order Table</h4>

        <div className="text-center w-full mb-6">
          <label
            htmlFor="filter"
            className="font-bold text-blue-600 mb-2 block"
          >
            Filter By
          </label>
          <select
            name="filter"
            id="filter"
            className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="day">Day</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Created
                </th>
                <th scope="col" className="px-6 py-3">
                  UserId
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((datum) => (
                <tr
                  key={datum.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 border">{datum.id}</td>
                  <td className="px-6 py-4 border">{datum.description}</td>
                  <td className="px-6 py-4 border">{datum.price}</td>
                  <td className="px-6 py-4 border">{datum.status}</td>
                  <td className="px-6 py-4 border">
                    {new Date(datum.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border">{datum.userId}</td>
                  <td className="px-6 py-4 text-right border">
                    <Link
                      to={`${datum.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-4">
          <button
            title="See previous orders"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mr-2"
          >
            {'<'} Previous
          </button>
          <button
            title="See next orders"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Next {'>'}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderTable;
