import Footer from "../../../components/Footer";
import Hardwares from "./Hardwares";

function Hardware() {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Godown Items Available
        </h1>
        <Hardwares />
      </div>

      <Footer />
    </>
  );
}

export default Hardware;
