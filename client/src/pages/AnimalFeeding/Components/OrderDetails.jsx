import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

const OrderDetails = () => {
  const { id } = useParams();
  return (
    <>
      <div className="p-4">
        <h2>{id}</h2>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
