export default (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      if (action.fromStorage) {
        return {
          ...state,
          user: action.info.user,
          token: action.token,
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
