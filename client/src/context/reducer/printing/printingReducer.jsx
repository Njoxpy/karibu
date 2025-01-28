export const printingReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRINTING_ORDERS":
      return { ...state, orders: action.payload };

    case "ADD_PRINTING_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };

    case "UPDATE_PRINTING_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, ...action.payload }
            : order
        ),
      };

    case "DELETE_PRINTING_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    case "GET_PRINTING_ORDER_BY_ID":
      const order = state.orders.find((order) => order.id === action.payload);
      return { ...state, selectedOrder: order };

    default:
      return state;
  }
};
