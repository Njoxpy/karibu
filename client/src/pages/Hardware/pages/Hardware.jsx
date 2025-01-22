import Footer from "../../../components/Footer";
import Hardwares from "./Hardwares";

function Hardware() {
  return (
    <>
    <div className="p-4 bg-blue-50 min-h-screen flex flex-col">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-center text-blue-700">
        Hardware Items Available
        </h1>
      </header>
      <main className="flex-grow">
        <Hardwares />
      </main>
    </div>
        <Footer />
    </>
  );
}

export default Hardware;
