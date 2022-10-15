const bookListInitialState = [
  {
    name: "",
    books: [],
  },
];
export const bookListActions = {
  SET_DATA: "SET_DATA",
  DELETE_USER: "DELETE_USER",
  ADD_USER: "ADD_USER",
};
export function bookList(state = bookListInitialState, action = {}) {
  switch (action.type) {
    case bookListActions.SET_DATA: {
      const userIndex = state.findIndex(
        (item) => item.name === action.payload.name
      );
      const newList = [...state[userIndex].books, action.payload.newBook];
      const newState = [...state];
      newState[userIndex] = newList;
      return newState;
    }
    case bookListActions.ADD_USER: {
      const newState = [...state];
      newState.push(action.payload.user);
      return newState;
    }
    case bookListActions.DELETE_USER: {
      const userIndex = state.findIndex(
        (item) => item.name === action.payload.name
      );
      const newState = [...state];
      newState.splice(userIndex, 1);
      return newState;
    }
    default:
      return state;
  }
}
