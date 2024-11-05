import { Link } from "react-router-dom";

const GodownItemsDetailsError = () => {
  return (
    <>
      <div className="p-4">
        <h3>Items Not Found</h3>
        <p>Sorry :) the item you were looking for was not found</p>
        <p>
          return to <Link to={"/godown"}>godown page</Link>
        </p>
      </div>
    </>
  );
};

export default GodownItemsDetailsError;
