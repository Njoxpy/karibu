import { useState } from "react";
import { Link } from "react-router-dom";

const UsersPage = () => {
    // Sample array of users
    const [users, setUsers] = useState([
        { id: 1, name: "Leon Shiyo", email: "leonshiyo@gmail.com" },
        { id: 2, name: "Martha Mwema", email: "martha.mwema@gmail.com" },
        { id: 3, name: "John Mushi", email: "johnmushi@gmail.com" },
        { id: 4, name: "Amina Hassan", email: "aminahassan@gmail.com" }
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
            <div>
            <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Add User</h2>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
              >
                Add User
              </button>
            </div>
          </form>
            </div>

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
