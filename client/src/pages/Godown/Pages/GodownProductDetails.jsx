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
      <OrderForm />

      <Footer />
    </>
  );
};

export default GodownProductDetails;
