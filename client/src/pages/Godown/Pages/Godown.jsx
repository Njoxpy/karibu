import Footer from "../../../components/Footer";
import InventoryTable from "./InventoryTable";

const Godown = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Godown Items Available
        </h1>
        <InventoryTable />

      </div>
      <Footer />
    </>
  );
};

export default Godown;
