// reducer/godownReducer.js

export const godownReducer = (state, action) => {
    switch (action.type) {
      case 'SET_GODOWN_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_GODOWN_ORDERS':
        return { ...state, orders: action.payload };
      case 'ADD_GODOWN_PRODUCT':
        return { ...state, products: [action.payload, ...state.products] };
      case 'ADD_GODOWN_ORDER':
        return { ...state, orders: [action.payload, ...state.orders] };
      default:
        return state;
    }
  };
  