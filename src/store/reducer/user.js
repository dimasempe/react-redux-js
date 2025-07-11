const DEFAULT_STATE = {
  username: "",
  id: "",
  user: ""
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "user/login": {
      const duplicateState = { ...state };
      duplicateState.username = action.payload.username;
      duplicateState.id = action.payload.id;
      duplicateState.user = action.payload.user;
      return duplicateState;
    }
    case "user/logout": {
      return DEFAULT_STATE;
    }
  }
  return state;
};
