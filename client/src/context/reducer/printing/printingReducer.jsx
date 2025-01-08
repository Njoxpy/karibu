// reducer/printingReducer.js

export const printingReducer = (state, action) => {
    switch (action.type) {
      case 'SET_PRINTING_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_PRINTING_ORDERS':
        return { ...state, orders: action.payload };
      case 'ADD_PRINTING_PRODUCT':
        return { ...state, products: [action.payload, ...state.products] };
      case 'ADD_PRINTING_ORDER':
        return { ...state, orders: [action.payload, ...state.orders] };
      default:
        return state;
    }
  };
  