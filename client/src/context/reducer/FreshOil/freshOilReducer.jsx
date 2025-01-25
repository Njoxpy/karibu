export const freshOilReducer = (state, action) => {
  switch (action.type) {
    // --- Product Actions ---
    case "SET_FRESH_OIL_PRODUCTS": // READ
      return { ...state, products: action.payload };

    case "ADD_FRESH_OIL_PRODUCT": // CREATE
      return { ...state, products: [action.payload, ...state.products] };

    case "UPDATE_FRESH_OIL_PRODUCT": // UPDATE
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case "DELETE_FRESH_OIL_PRODUCT": // DELETE
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case "GET_FRESH_OIL_PRODUCT_BY_ID": // READ BY ID
      return {
        ...state,
        selectedProduct: state.products.find(
          (product) => product.id === action.payload
        ),
      };

    // --- Order Actions ---
    case "SET_FRESH_OIL_ORDERS": // READ
      return { ...state, orders: action.payload };

    case "ADD_FRESH_OIL_ORDER": // CREATE
      return { ...state, orders: [action.payload, ...state.orders] };

    case "UPDATE_FRESH_OIL_ORDER": // UPDATE
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case "DELETE_FRESH_OIL_ORDER": // DELETE
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    case "GET_FRESH_OIL_ORDER_BY_ID": // READ BY ID
      return {
        ...state,
        selectedOrder: state.orders.find(
          (order) => order.id === action.payload
        ),
      };

    // Optional: Clear all products or orders
    case "CLEAR_FRESH_OIL_PRODUCTS": // DELETE ALL PRODUCTS
      return { ...state, products: [] };

    case "CLEAR_FRESH_OIL_ORDERS": // DELETE ALL ORDERS
      return { ...state, orders: [] };

    default:
      return state;
  }
};
