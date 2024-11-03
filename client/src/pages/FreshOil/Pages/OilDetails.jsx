import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

const OilDetails = () => {
  const { id } = useParams();
  return (
    <>
      <div className="p-4">
        <h3>oil details page</h3>
        <p>oil details for order id: {id}</p>
      </div>

      <Footer />
    </>
  );
};

export default OilDetails;
