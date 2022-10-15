export const cardActions = {
  ADD_TO_CART: "ADD_TO_CART",
  CHECKOUT_REQUEST: "CHECKOUT_REQUEST",
  CHECKOUT_SUCCESS: "CHECKOUT_SUCCESS",
  CHECKOUT_FAILURE: "CHECKOUT_FAILURE",
  RECEIVE_PRODUCTS: "RECEIVE_PRODUCTS",
};
const initialState = {
  addedIds: [],
  quantityById: {},
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case cardActions.ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state;
      }
      return [...state, action.productId];
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case cardActions.ADD_TO_CART:
      const { productId } = action;
      return { ...state, [productId]: (state[productId] || 0) + 1 };
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = (state) => state.addedIds;

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case cardActions.CHECKOUT_REQUEST:
      return initialState;
    case cardActions.CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      };
  }
};
