import { useState } from "react";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Godbless Nyagawa", email: "godblessnyagawa12@gmail.com", role: "Admin", status: "active" },
    { id: 2, name: "Jane Kimbweta", email: "jane@gmail.com", role: "User", status: "inactive" },
    { id: 3, name: "Alice Makalius", email: "alice@example.com", role: "User", status: "active" },
    { id: 4, name: "John Samweli", email: "johnsamweli@gmail.com", role: "Admin", status: "active" },
    { id: 5, name: "Yuda Mwita", email: "mwitayuda@gmail.com", role: "User", status: "inactive" },
    { id: 6, name: "Karim Gesu", email: "karimugesu@example.com", role: "User", status: "active" },
    { id: 7, name: "Aisha Kibona", email: "aishakibona@gmail.com", role: "Admin", status: "active" },
    { id: 8, name: "Matty Kingunge", email: "kingenguematty@gmail.com", role: "User", status: "inactive" },
  ]);
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUsername, setNewUsername] = useState("");

  const handleDelete = () => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
    setDeleteModalOpen(false);
    alert("User deleted successfully!");
  };

  const handleEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === userToEdit.id ? { ...user, name: newUsername } : user
      )
    );
    setEditModalOpen(false);
    alert("Username updated successfully!");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Manage Users</h2>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          className="p-3 border rounded-md w-full shadow-sm focus:outline-blue-400"
          placeholder="Search by name or email"
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
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-3 space-x-3">
                  <button
                    onClick={() => {
                      setUserToEdit(user);
                      setNewUsername(user.name);
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
            <h3 className="text-xl font-semibold mb-4">Edit Username</h3>
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
