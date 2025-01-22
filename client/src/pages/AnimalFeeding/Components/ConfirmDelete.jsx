import React from 'react';

const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-between">
          <button onClick={onCancel} className="bg-gray-500 text-white py-1 px-4 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white py-1 px-4 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;