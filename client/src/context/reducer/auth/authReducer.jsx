// Updated authReducer to handle both user and token
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return { user: null, token: null };
    default:
      return state;
  }
};
