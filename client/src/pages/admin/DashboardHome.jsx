const DashboardHome = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Cards for Stats */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Sales</h3>
                        <p className="text-3xl font-bold">₦10,000</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-3xl font-bold">120</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Products</h3>
                        <p className="text-3xl font-bold">200</p>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="mt-5">
                    <h3 className="text-xl font-semibold">Recent Orders</h3>
                    <table className="min-w-full mt-3 bg-white shadow rounded-lg">
                        <thead>
                            <tr>
                                <th className="p-3 text-left">Order ID</th>
                                <th className="p-3 text-left">Customer</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add dynamic rows here */}
                            <tr>
                                <td className="p-3">123</td>
                                <td className="p-3">John Doe</td>
                                <td className="p-3 text-green-600">Completed</td>
                                <td className="p-3">Dec 12, 2024</td>
                            </tr>
                            <tr>
                                <td className="p-3">124</td>
                                <td className="p-3">Jane Smith</td>
                                <td className="p-3 text-yellow-500">Pending</td>
                                <td className="p-3">Dec 11, 2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
