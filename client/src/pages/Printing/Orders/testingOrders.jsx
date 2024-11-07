import Data from "../../../../../data/orders.json";

const TestingOrders = () => {
  return (
    <>
      <div className="p-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
            <th className="px-4 py-2 border">id</th>
            <th className="px-4 py-2 border">description</th>
            <th className="px-4 py-2 border">price</th>
            <th className="px-4 py-2 border">status</th>
            <th className="px-4 py-2 border">date</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((data, index) => (
                <tr key={index} className="hover:bg-gray-300">
                    <td className="px-4 py-2 border">{data.id}</td>
                    <td className="px-4 py-2 border">{data.description}</td>
                    <td className="px-4 py-2 border">{data.price}</td>
                    <td className="px-4 py-2 border">{data.status}</td>
                    <td className="px-4 py-2 border">{data.createdAt}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TestingOrders;
