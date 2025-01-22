import Footer from "../../../components/Footer";
import InventoryTable from "./InventoryTable";

const Godown = () => {
  return (
    <>
<div className="p-4 bg-green-50 min-h-screen flex flex-col">
  <header className="mb-6">
    <h1 className="text-4xl font-extrabold text-center text-gray-700">
    Godown Items Available
    </h1>
  </header>
  <main className="flex-grow">
    <InventoryTable />
  </main>
</div>
    <Footer />
</>
  );
};

export default Godown;
