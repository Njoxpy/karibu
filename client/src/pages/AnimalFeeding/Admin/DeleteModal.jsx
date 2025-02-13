const DeleteModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete "{product.product_name}"?</p>
        <button onClick={onConfirm} className="confirm-btn">
          Yes, Delete
        </button>
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
