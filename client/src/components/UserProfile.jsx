import Leon from "../assets/images/leon.jpg";
import Footer from "../components/Footer"

const UserProfile = () => {
    const orders = [
        {
            id: "1244363433663",
            date: "2024-12-01",
            status: "Completed",
            products: ["Laptop Cooling Pad"],
            quantities: [1, 2],
            prices: ["Tsh 30000"]
        },
        {
            id: "124436343334",
            date: "2024-12-05",
            status: "Pending",
            products: ["PC Cooling Fan"],
            quantities: [1],
            prices: ["Tsh 30000"]
        },
        {
            id: "3535355556",
            date: "2024-12-10",
            status: "Cancelled",
            products: ["Wireless Keyboard"],
            quantities: [1],
            prices: ["Tsh 30000"]
        }
    ];

    return (
        <>
            <div className="bg-blue-50 text-gray-900 overflow-x-auto sm:overflow-visible">
                <div className="max-w-4xl mx-auto p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-blue-600">User Profile</h1>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Logout
                        </button>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <div className="flex items-center space-x-4">
                            <img
                                className="w-24 h-24 rounded-full border-2 border-blue-600"
                                src={Leon}
                                alt="Profile"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Leon Thadei Shiyo</h2>
                                <p className="text-gray-600">leonine@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold text-blue-600 mb-4">Order History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th className="py-2 px-4 border-b">Order ID</th>
                                        <th className="py-2 px-4 border-b">Date</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                        <th className="py-2 px-4 border-b">Products</th>
                                        <th className="py-2 px-4 border-b">Quantity</th>
                                        <th className="py-2 px-4 border-b">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order.id} className={index % 2 === 0 ? "bg-blue-50" : ""}>
                                            <td className="py-2 px-4 border-b">{order.id}</td>
                                            <td className="py-2 px-4 border-b">{order.date}</td>
                                            <td className={`py-2 px-4 border-b text-${order.status === 'Completed' ? 'green' : order.status === 'Pending' ? 'yellow' : 'red'}-600`}>
                                                {order.status}
                                            </td>
                                            <td className="py-2 px-4 border-b">{order.products.join(", ")}</td>
                                            <td className="py-2 px-4 border-b">{order.quantities.join(", ")}</td>
                                            <td className="py-2 px-4 border-b">{order.prices.join(", ")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;
