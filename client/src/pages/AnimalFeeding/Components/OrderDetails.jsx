import { useParams } from "react-router-dom";
import Hen from "../../../assets/images/hen.jpg";
import Footer from "../../../components/Footer";

const products = [
  {
    id: 1,
    name: "Cold Brew Bottle",
    description:
      "This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.",
    href: "#",
    quantity: 1,
    price: "Tsh 3200.00",
    imageSrc: Hen,
    imageAlt: "Glass bottle with black plastic pour top and mesh insert.",
  },
];

const OrderDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("authToken");

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-base font-medium text-indigo-600">
              Thank you!
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              It's on the way!
            </p>
            <p className="mt-2 text-base text-gray-500">
              Your order has been created and will be added into orders list.
            </p>
          </div>

          <div className="mt-10 border-t border-gray-200">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex space-x-6 border-b border-gray-200 py-10"
              >
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                />
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">{product.price}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>
              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="text-gray-900">Tsh 2300.00</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
