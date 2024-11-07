import Loading from "../../../components/Loading";

const Orders = ({ orders, loading }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="p-4">
        <div>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-green-200 text-gray-800">
                <th className="px-4 py-2 border">order id</th>
                <th className="px-4 py-2 border">order description</th>
                <th className="px-4 py-2 border">order price</th>
                <th className="px-4 py-2 border">order status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.description}</td>
                  <td className="px-4 py-2 border">Tsh {order.price}</td>
                  <td className="px-4 py-2 border">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
