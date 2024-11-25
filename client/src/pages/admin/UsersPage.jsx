import React from "react";

const UsersPage = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
            <ul className="mt-4 space-y-4">
                {/* Map through users */}
                <li className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
                    <div>
                        <p className="font-semibold">Leon Shiyo</p>
                        <p className="text-gray-600">leonshiyo@gmail.com</p>
                    </div>
                    <button className="text-indigo-600 hover:underline">Edit</button>
                </li>
            </ul>
        </div>
    );
};

export default UsersPage;
