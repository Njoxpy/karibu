import Footer from "../../../components/Footer";
import FoodsBody from "./FoodsBody";

const AnimalFeeding = () => {
  return (
    <>
      <div className="p-4 bg-green-50">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Animal Feeding Products
        </h1>
        <FoodsBody />
      </div>
      <Footer />
    </>
  );
};

export default AnimalFeeding;
