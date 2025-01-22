import Footer from "../../../components/Footer";
import Oils from "./Oils";

export default function Oil() {
  return (
    <>
    <div className="p-4 bg-green-50 min-h-screen flex flex-col">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-center text-yellow-700">
          Fresh Oil Products
        </h1>
      </header>
      <main className="flex-grow">
        <Oils />
      </main>
    </div>
        <Footer />
  </>
  );
}
