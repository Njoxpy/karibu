const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <h3>{product.product_name}</h3>
      <p>Category: {product.product_category}</p>
      <p>Price: {product.product_price}</p>
      <p>Quantity: {product.product_quantity}</p>
      <p>Owner: {product.product_owner}</p>
      <div className="actions">
        <button onClick={() => onEdit(product)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(product)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
