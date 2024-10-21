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
    return (
      <div className="text-yellow-800 p-4">
        loading Inapakia data...Subiri kidogo
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-600 p-4 font-bold">
        Error: kuna tatizo limetokea :)...
      </div>
    );
  }

  return (
    <>
      <div className="p-4 w-full">
        <h4 className="text-center font-bold p-2">Order Table</h4>

        <div className="text-center w-full">
          <label htmlFor="filter" className="font-bold p-2">
            Filter By
          </label>
          <select name="filter" id="">
            <option value="day">day</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
          </select>
        </div>
        <table className="table-auto order-table">
          <thead>
            <tr>
              <th className="border px-4 py-2">Order Id</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date Created</th>
              <th className="border px-4 py-2">UserId</th>
              <th className="border px-4 py-2">
                <button>order details</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((datum) => (
              <tr key={datum.id}>
                <td className="border px-4 py-2">{datum.id}</td>
                <td className="border px-4 py-2">{datum.description}</td>
                <td className="border px-4 py-2">{datum.price}</td>
                <td className="border px-4 py-2">{datum.status}</td>
                <td className="border px-4 py-2">
                  {new Date(datum.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{datum.userId}</td>
                <td className="border px-4 py-2">
                  <button>
                    <Link to={`${datum.id}`}>details</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <button title="see previos orders" className="font-bold p-2">
            {'<'} Previous
          </button>
          <button title="see next orders" className="font-bold p-2">
            {' '}
            Next {'>'}{' '}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderTable;

/**
 * Pagination or Infinite Scroll: If there are many orders, consider adding pagination or infinite scrolling for ease of use.
 * add a option for users to filter orders by day, weekly and month
 * have the timeout for the page if it exceeds the amount of time to fetch data of the website from the give server into the website.
 */
