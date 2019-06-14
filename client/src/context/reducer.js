export default (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      if (action.payload.fromStorage) {
        return {
          ...state,
          user: action.payload.user.user || action.payload.user,
          token: action.payload.token,
          authenticated: true,
        };
      }
      return { ...state };
    case 'removeUser':
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
