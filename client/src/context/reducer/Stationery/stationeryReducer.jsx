// reducer/stationeryReducer.js

export const stationeryReducer = (state, action) => {
    switch (action.type) {
      case 'SET_STATIONERY_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_STATIONERY_ORDERS':
        return { ...state, orders: action.payload };
      case 'ADD_STATIONERY_PRODUCT':
        return { ...state, products: [action.payload, ...state.products] };
      case 'ADD_STATIONERY_ORDER':
        return { ...state, orders: [action.payload, ...state.orders] };
      default:
        return state;
    }
  };
  