const clientsInitialState = [
  { firstName: "", lastName: "", age: 20, country: "" },
];
export const clientsActions = {
  ADD_CLIENT: "ADD_CLIENT",
  DELETE_CLIENT: "DELETE_CLIENT",
  EDITE_CLIENT: "EDITE_CLIENT",
};
export function clientsReducer(state = clientsInitialState, action = {}) {
  switch (action.type) {
    case clientsActions.ADD_CLIENT: {
      const stateLen = state.length;
      const newUserId = stateLen > 0 ? state[state.length - 1].id + 1 : 1;
      return [...state, { ...action.payload, id: newUserId }];
    }
    case clientsActions.DELETE_CLIENT: {
      const userIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      const newState = [...state];
      newState.splice(userIndex, 1);
      return newState;
    }
    case clientsActions.EDITE_CLIENT: {
      const userIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      const newState = [...state];
      newState[userIndex] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
