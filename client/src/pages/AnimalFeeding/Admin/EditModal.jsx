const EditModal = ({ product, onClose, onSubmit, onChange }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="product_category"
              value={product.product_category}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="product_price"
              value={product.product_price}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="product_quantity"
              value={product.product_quantity}
              onChange={onChange}
              required
            />
          </label>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
