import { Link } from "react-router-dom";

const FreshOilOrderDetailsError = () => {
  return (
    <>
      <div className="p-4">
        <h3>Order Not Found</h3>
        <p>Sorry :) the order you were looking for was not found</p>
        <p>
          return to <Link to={"/godown/orders"}>godown orders page</Link>
        </p>
      </div>
    </>
  );
};

export default FreshOilOrderDetailsError;
