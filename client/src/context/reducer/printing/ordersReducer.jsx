export const printingOrderReducer = (state, action) => {
    switch (action.type) {
        case "SET_ORDERS":
            return {
                order: action.payload,
            };
        case "ADD_ORDERS":
            return {
                orders: [action.payload, ...state.orders],
            };

        default:
            return state;
    }
};
