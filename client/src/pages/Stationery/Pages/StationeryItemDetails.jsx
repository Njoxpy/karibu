import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

const StationeryItemDetails = () => {
  const { id } = useParams();
  return (
    <>
      <div className="p-4">
        <h3>Stationery details page</h3>
        <p>Staionery item with the id: {id}</p>
      </div>

      <Footer />
    </>
  );
};

export default StationeryItemDetails;
