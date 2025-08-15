const DEFAULT_STATE = {
  items: [],
};

export const cartReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "cart/get": {
      const duplicateState = { ...state };
      duplicateState.items = action.payload;
      return duplicateState;
    }
    case "cart/add": {
      const duplicateState = { ...state };
      duplicateState.cart.push(action.payload);
      return duplicateState;
    }
    case "cart/remove": {
      const duplicateState = { ...state };
      duplicateState.cart = (duplicateState.cart || []).filter(
        (item) => item.id !== action.payload
      );
      return duplicateState;
    }
  }
  return state;
};
