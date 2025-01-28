export const godownReducer = (state, action) => {
  switch (action.type) {
    // --- Product Actions ---
    case "SET_GODOWN_PRODUCTS": // READ
      return { ...state, products: action.payload };

    case "ADD_GODOWN_PRODUCT": // CREATE
      return { ...state, products: [action.payload, ...state.products] };

    case "UPDATE_GODOWN_PRODUCT": // UPDATE
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case "DELETE_GODOWN_PRODUCT": // DELETE
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case "GET_GODOWN_PRODUCT_BY_ID": // READ BY ID
      return {
        ...state,
        selectedProduct: state.products.find(
          (product) => product.id === action.payload
        ),
      };

    // --- Order Actions ---
    case "SET_GODOWN_ORDERS": // READ
      return { ...state, orders: action.payload };

    case "ADD_GODOWN_ORDER": // CREATE
      return { ...state, orders: [action.payload, ...state.orders] };

    case "UPDATE_GODOWN_ORDER": // UPDATE
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case "DELETE_GODOWN_ORDER": // DELETE
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    case "GET_GODOWN_ORDER_BY_ID": // READ BY ID
      return {
        ...state,
        selectedOrder: state.orders.find(
          (order) => order.id === action.payload
        ),
      };

    // Optional: Clear all products or orders
    case "CLEAR_GODOWN_PRODUCTS": // DELETE ALL PRODUCTS
      return { ...state, products: [] };

    case "CLEAR_GODOWN_ORDERS": // DELETE ALL ORDERS
      return { ...state, orders: [] };

    default:
      return state;
  }
};
