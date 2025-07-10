const DEFAULT_STATE = {
  counter: 0,
};

export const counterReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "counter/increment": {
      const duplicateState = { ...state };
      duplicateState.counter += 1;
      return duplicateState;
    }
    case "counter/decrement": {
      const duplicateState = { ...state };
      duplicateState.counter -= 1;
      return duplicateState;
    }
    case "counter/fill_counter": {
      const duplicateState = { ...state };
      duplicateState.counter = action.payload;
      return duplicateState;
    }
  }
  return state;
};
