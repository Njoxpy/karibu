import Footer from "../../../components/Footer";
import Oils from "./Oils";

export default function Oil() {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Godown Items Available
        </h1>
        <Oils />
      </div>
      <Footer />
    </>
  );
}
