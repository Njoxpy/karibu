import { Link, useRouteError } from 'react-router-dom';
import Footer from '../components/Footer';

function OrderDetailsError() {
  const error = useRouteError();
  return (
    <>
      <div className="p-4">
        <h4>Order Details Error</h4>
        <p>{error}</p>z
        <p>
          return to <Link to={'/'}>homepage</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default OrderDetailsError;
