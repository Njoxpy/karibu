import { useState } from "react";

const DashboardHome = () => {

    const [orders, setOrders] = useState(
        [
            { "orderId": 1222, "customer": "NjoxPy", "status": "Completed", "date": "Dec 11, 2024" },
            { "orderId": 1223, "customer": "TrixCode", "status": "Pending", "date": "Dec 12, 2024" },
            { "orderId": 1224, "customer": "SavvyTech", "status": "Processing", "date": "Dec 12, 2024" },
            { "orderId": 1225, "customer": "TechieHub", "status": "Completed", "date": "Dec 11, 2024" },
            { "orderId": 1226, "customer": "NjoxPy", "status": "Cancelled", "date": "Dec 10, 2024" },
            { "orderId": 1227, "customer": "ByteWorks", "status": "Completed", "date": "Dec 11, 2024" },
            { "orderId": 1228, "customer": "NjoxPy", "status": "Processing", "date": "Dec 12, 2024" },
            { "orderId": 1229, "customer": "CloudMasters", "status": "Completed", "date": "Dec 11, 2024" },
            { "orderId": 1230, "customer": "CodeSphere", "status": "Pending", "date": "Dec 13, 2024" },
            { "orderId": 1231, "customer": "TrixCode", "status": "Completed", "date": "Dec 11, 2024" },
            { "orderId": 1232, "customer": "SavvyTech", "status": "Processing", "date": "Dec 12, 2024" },
            { "orderId": 1233, "customer": "NjoxPy", "status": "Completed", "date": "Dec 11, 2024" },
            { "orderId": 1234, "customer": "TechieHub", "status": "Cancelled", "date": "Dec 10, 2024" },
            { "orderId": 1235, "customer": "ByteWorks", "status": "Pending", "date": "Dec 12, 2024" },
            { "orderId": 1236, "customer": "NjoxPy", "status": "Completed", "date": "Dec 11, 2024" },
            { "orderId": 1237, "customer": "CloudMasters", "status": "Processing", "date": "Dec 13, 2024" },
            { "orderId": 1238, "customer": "CodeSphere", "status": "Completed", "date": "Dec 12, 2024" },
            { "orderId": 1239, "customer": "TrixCode", "status": "Pending", "date": "Dec 13, 2024" },
            { "orderId": 1240, "customer": "SavvyTech", "status": "Completed", "date": "Dec 12, 2024" },
            { "orderId": 1241, "customer": "NjoxPy", "status": "Cancelled", "date": "Dec 11, 2024" }
        ]

    )
    return (
        <div className="flex">
            {/* Sidebar */}
            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Cards for Stats */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Sales</h3>
                        <p className="text-3xl font-bold">Tsh 1,000,000</p>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
