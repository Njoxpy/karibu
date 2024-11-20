import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";
import OrderForm from "../../AnimalFeeding/Pages/OrderForm";

const GodownProductDetails = () => {
  const { id } = useParams();

  const product = {
    id: 1,
    name: "Construction Cement Bag",
    price: 2300,
    description: "High quality cements from tembo cement power plant.",
    image: "/images/dog-food.jpg",
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 bg-green-50">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="w-1/2 h-64 object-cover mb-4 "
        />
        <p className="mb-4">
          {product.description} and product id is: {id}
        </p>
        <p className="font-bold text-green-700">
          Price: ${product.price.toFixed(2)}
        </p>
        <div className="mt-4 flex items-center">
          <input
            type="number"
            min="1"
            className="border border-gray-300 rounded px-3 py-1 mr-2 w-20"
          />
          <button className="bg-yellow-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-yellow-600">
            Add to Cart
          </button>
        </div>
      </div>
      <OrderForm />

      <Footer />
    </>
  );
};

export default GodownProductDetails;
