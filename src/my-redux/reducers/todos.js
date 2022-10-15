export const todosActions = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
  COMPLETE_ALL_TODOS: "COMPLETE_ALL_TODOS",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
  SET_VISIBILITY_FILTER: "SET_VISIBILITY_FILTER",
};

const todosInitialState = [
  {
    text: "Use Redux",
    completed: false,
    id: 0,
  },
];

export function todos(state = todosInitialState, action) {
  switch (action.type) {
    case todosActions.ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
      ];

    case todosActions.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case todosActions.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case todosActions.COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case todosActions.COMPLETE_ALL_TODOS:
      const areAllMarked = state.every((todo) => todo.completed);
      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }));

    case todosActions.CLEAR_COMPLETED:
      return state.filter((todo) => todo.completed === false);

    default:
      return state;
  }
}
