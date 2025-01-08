// reducer/hardwareReducer.js

export const hardwareReducer = (state, action) => {
    switch (action.type) {
      case 'SET_HARDWARE_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_HARDWARE_ORDERS':
        return { ...state, orders: action.payload };
      case 'ADD_HARDWARE_PRODUCT':
        return { ...state, products: [action.payload, ...state.products] };
      case 'ADD_HARDWARE_ORDER':
        return { ...state, orders: [action.payload, ...state.orders] };
      default:
        return state;
    }
  };
  