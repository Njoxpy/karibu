import Footer from "../../../components/Footer";
import InventoryTable from "./InventoryTable";

const Godown = () => {
  return (
    <>
      <div className="p-4 min-h-screen flex flex-col">
        {/* Header */}
        <header className="mb-8 py-6 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-800">
              Godown Items Available
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InventoryTable />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Godown;
