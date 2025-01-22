import Footer from "../../../components/Footer";
import FoodsBody from "./FoodsBody";

const AnimalFeeding = () => {
  return (
    <>
      <div className="p-4 bg-green-50 min-h-screen flex flex-col">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-center text-green-700">
            Animal Feeding Products
          </h1>
        </header>
        <main className="flex-grow">
          <FoodsBody />
        </main>
      </div>
          <Footer />
    </>
  );
};

export default AnimalFeeding;
