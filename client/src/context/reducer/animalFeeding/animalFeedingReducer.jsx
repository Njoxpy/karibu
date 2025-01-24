export const animalFeedingReducer = (state, action) => {
  switch (action.type) {
    // --- Product Actions ---
    case "SET_ANIMAL_FEEDING_PRODUCTS": // READ
      return { ...state, products: action.payload };

    case "ADD_ANIMAL_FEEDING_PRODUCT": // CREATE
      return { ...state, products: [action.payload, ...state.products] };

    case "UPDATE_ANIMAL_FEEDING_PRODUCT": // UPDATE
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case "DELETE_ANIMAL_FEEDING_PRODUCT": // DELETE
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    // --- Order Actions ---
    case "SET_ANIMAL_FEEDING_ORDERS": // READ
      return { ...state, orders: action.payload };

    case "ADD_ANIMAL_FEEDING_ORDER": // CREATE
      return { ...state, orders: [action.payload, ...state.orders] };

    case "UPDATE_ANIMAL_FEEDING_ORDER": // UPDATE
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case "DELETE_ANIMAL_FEEDING_ORDER": // DELETE
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    // Optional: Clear all products or orders
    case "CLEAR_ANIMAL_FEEDING_PRODUCTS": // DELETE ALL PRODUCTS
      return { ...state, products: [] };

    case "CLEAR_ANIMAL_FEEDING_ORDERS": // DELETE ALL ORDERS
      return { ...state, orders: [] };

    default:
      return state;
  }
};
