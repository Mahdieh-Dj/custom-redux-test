export const counterActions = {
  increment: "COUNTER/INCREMENT",
  decrement: "COUNTER/DECREMENT",
  reset: "COUNTER/RESET",
};
const counterInitialState = {
  value: 0,
};
export const counterReducer = (state = counterInitialState, action) => {
  switch (action.type) {
    case counterActions.increment:
      state.value++;
      break;
    case counterActions.decrement:
      state.value--;
      break;
    case counterActions.reset:
      state.value = 0;
      break;
  }

  return state;
};
