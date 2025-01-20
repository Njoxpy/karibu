export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Store user and token in localStorage and update state
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      // Clear user and token from state and localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      return {
        ...state,
        user: null,
        token: null,
      };

    case "SET_TOKEN":
      // Update the token in state and localStorage
      localStorage.setItem("authToken", action.payload);
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};
