import Footer from "../../../components/Footer";
import Search from "../Components/Search";
import StationeryBody from "./StationeryBody";

const StationeyItemsList = () => {
  return (
    <>
      <div className="p-4">
        <Search />
        <StationeryBody />
      </div>

      <Footer />
    </>
  );
};

export default StationeyItemsList;
