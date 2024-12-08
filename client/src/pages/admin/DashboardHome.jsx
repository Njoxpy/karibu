const DashboardHome = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to the Dashboard</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-3xl font-bold text-indigo-600">120</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-3xl font-bold text-indigo-600">54</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Users</h3>
                    <p className="text-3xl font-bold text-indigo-600">78</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
