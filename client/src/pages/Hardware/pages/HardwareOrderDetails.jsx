import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

function HardwareOrdersDetails() {
  const { id } = useParams();

  const order = {
    productName: "Animal Feed A",
    quantity: 2,
    totalPrice: 4000,
    id: 1,
  };
  return (
    <>
      <div className="p-4 bg-blueBg">
        <div>
          <h3 className="text-center">Stationery Order Details</h3>
          <div className="text-center">
            <h3>Order id: {id}</h3>
            <p>product name: {order.productName}</p>
            <p>
              Amout of {order.productName} ordered: {order.quantity}
            </p>
            <p>Total Price: {order.totalPrice}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HardwareOrdersDetails;
