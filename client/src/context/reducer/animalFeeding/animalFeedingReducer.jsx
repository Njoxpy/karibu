// reducer/animalFeedingReducer.js

export const animalFeedingReducer = (state, action) => {
    switch (action.type) {
      case 'SET_ANIMAL_FEEDING_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_ANIMAL_FEEDING_ORDERS':
        return { ...state, orders: action.payload };
      case 'ADD_ANIMAL_FEEDING_PRODUCT':
        return { ...state, products: [action.payload, ...state.products] };
      case 'ADD_ANIMAL_FEEDING_ORDER':
        return { ...state, orders: [action.payload, ...state.orders] };
      default:
        return state;
    }
  };
  