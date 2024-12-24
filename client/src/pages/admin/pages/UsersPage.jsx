import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";  // Using axios for HTTP requests

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUsername, setNewUsername] = useState("");

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users");
        setUsers(response.data);  // Assuming the API returns an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run once on mount

  const handleDelete = () => {
    setUsers(users.filter((user) => user._id !== userToDelete._id)); // Use _id for delete
    setDeleteModalOpen(false);
    alert("User deleted successfully!");
  };

  const handleEdit = () => {
    setUsers(
      users.map((user) =>
        user._id === userToEdit._id ? { ...user, email: newUsername } : user // Update email or another field
      )
    );
    setEditModalOpen(false);
    alert("User updated successfully!");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) || // Search by email
      user.role.toLowerCase().includes(search.toLowerCase()) // Optionally, search by role
  );

  return (
    <div className="p-5">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Manage Users</h2>

      {/* Display number of users */}
      <p className="text-lg mb-4">Total Users: {users.length}</p>  {/* This will display the number of users */}

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          className="p-3 border rounded-md w-full shadow-sm focus:outline-blue-400"
          placeholder="Search by email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Link
        to={"/admin/users/create"}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Add New User
      </Link>

      {/* User Table */}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">User ID</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id} // Use _id for key
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="px-6 py-3">{user._id}</td> {/* Display _id */}
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">{user.category}</td> {/* Display category */}
                <td className="px-6 py-3 space-x-3">
                  <button
                    onClick={() => {
                      setUserToEdit(user);
                      setNewUsername(user.email); // Default to email for editing
                      setEditModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setUserToDelete(user);
                      setDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              className="p-3 border rounded-md w-full mb-4 shadow-sm focus:outline-blue-400"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
