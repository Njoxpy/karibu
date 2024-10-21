import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';

function OrderDetails() {
  const { id } = useParams();

  const handleClick = () => {
    // fetch order by and id then delete confirm that the order exists or not
    console.log('you will be deleting the list of order by an id');

    window.confirm('do you really want to delete?');
  };
  return (
    <>
      <div className="p-4">
        <h4>OrderDetails</h4>
        <p>order id is: {id}</p>
        <button
          className="text-white bg-red-500 p-2 hover:bg-red-600 transition-all duration-75"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>

      <Footer />
    </>
  );
}

export default OrderDetails;

/**
 * use the aysnc await function to get data from an api of the website then implemenent the basic functionality into how to fetch data from the server of the website
 *
 * Receipt Link: Provide a download link to view or download the receipt again.
Navigation: Button to return to the Orders Page.
- use the react loader to fetch data from the database
 */
