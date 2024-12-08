import { useState } from "react";

const UsersPage = () => {
    // Sample array of users
    const [users, setUsers] = useState([
        { id: 1, name: "Leon Shiyo", email: "leonshiyo@gmail.com" },
        { id: 2, name: "Martha Mwema", email: "martha.mwema@gmail.com" },
        { id: 3, name: "John Mushi", email: "johnmushi@example.com" },
        { id: 4, name: "Amina Hassan", email: "amina.hassan@example.com" }
    ]);

    // Function to handle editing a user
    const handleEdit = (id) => {
        console.log(`Edit user with ID: ${id}`);
        // Implement your edit logic here
    };

    // Function to handle deleting a user
    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        console.log(`Deleted user with ID: ${id}`);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>

            <ul className="mt-4 space-y-4">
                {/* Loop through the users */}
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                    >
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(user.id)}
                                className="text-indigo-600 hover:underline mr-4"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
