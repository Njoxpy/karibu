import Footer from "../../../components/Footer";
import SearchGodownItem from "../Components/SearchGownItem";
import InventoryTable from "./InventoryTable";
import OrdersTestings from "./OrderTesting";
import TestingPagination from "./TestingPagination";

const Godown = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Godown Items Available
        </h1>
        <SearchGodownItem />
        <InventoryTable />

        <OrdersTestings />
      </div>
      <Footer />
    </>
  );
};

export default Godown;
