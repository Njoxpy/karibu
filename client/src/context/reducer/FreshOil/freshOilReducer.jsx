// reducers/freshOilReducer.js

export const freshOilReducer = (state, action) => {
  switch (action.type) {
    case "SET_FRESH_OIL_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_FRESH_OIL_ORDERS":
      return { ...state, orders: action.payload };
    case "ADD_FRESH_OIL_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "ADD_FRESH_OIL_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };
    default:
      return state;
  }
};
