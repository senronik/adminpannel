// AuthReducer.js
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      const token = localStorage.getItem("token");
      return token ? { ...state, isauthenticate: true } : state;
    }
    case 'LOGOUT':
      localStorage.removeItem("token");
      return { ...state, isauthenticate: false };
    case 'CLICKED':
      console.log(action.payload);
      return { ...state, userProfile: true };
    default:
      return state;
  }
};

  export default reducer;
  