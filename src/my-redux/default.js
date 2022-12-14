function kindOf(inp) {
  return Object.prototype.toString.call(inp).slice(8, -1).toLowerCase();
}
function cloneState(state) {
  switch (kindOf(state)) {
    case "object":
      return { ...state };
    case "array":
      return [...state];

    default:
      return state;
  }
}
export function createStore(reducer, initialState) {
  if (typeof reducer !== "function") {
    throw new Error(
      `Reducer should be a function, but the current is: ${kindOf(reducer)}`
    );
  }

  if (typeof initialState === "function") {
    throw new Error(`InitialState can't be a function`);
  }
  let state = initialState;
  let listeners = [];
  let isDispatching = false;
  let stack = [];
  let position = 0;
  let lastState = state;

  function getState() {
    return state;
  }

  function dispatch(action) {
    if (isDispatching) {
      throw new Error(
        "I can't process another action while processing! take a while"
      );
    }
    if (kindOf(action) !== "object") {
      throw new Error(
        `Action sohuld be an object, current is: ${kindOf(action)}`
      );
    }

    if (!action.hasOwnProperty("type")) {
      throw new Error("Action's type not found. it's required");
    }

    try {
      isDispatching = true;
      let prevState = cloneState(state);
      state = reducer(state, action);

      stack.push(prevState);
      position += 1;
      lastState = cloneState(state);
    } catch (error) {
      console.log(error);
    } finally {
      isDispatching = false;
    }

    notify();
  }

  function notify() {
    for (const listener of listeners) {
      listener();
    }
  }

  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(
        `Listener should be a function, current is: ${kindOf(listener)}`
      );
    }
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    };
  }

  function undo() {
    // Check if we can go back to the prev state
    if (position > 0) {
      position -= 1;
      const $state = stack[position];

      state = $state;
      notify();
    }
  }

  function redo() {
    // Check if we can redo to the next state
    if (position < stack.length - 1) {
      position += 1;
      const $state = stack[position];

      state = $state;
    } else {
      state = lastState;
    }

    notify();
  }

  dispatch({
    type: "@KHIYARSHOR_SHAH",
  });

  return {
    getState,
    dispatch,
    subscribe,
    undo,
    redo,
  };
}
function assertReducersShape(reducers) {
  for (const reducerKey in reducers) {
    const reducer = reducers[reducerKey];

    const actionTypeA = "@KHIYARSHOR_SHAH";
    const reducerStateA = reducer(undefined, {
      type: actionTypeA,
    });

    if (typeof reducerStateA === "undefined") {
      throw new Error(
        `Reducer ${reducerKey} returns undefined for action's type ${actionTypeA}`
      );
    }

    const actionTypeB = Math.random().toString(16).slice(2);
    const reducerStateB = reducer(undefined, {
      type: actionTypeB,
    });

    if (typeof reducerStateB === "undefined") {
      throw new Error(
        `Reducer ${reducerKey} returns undefined for action's type ${actionTypeB}`
      );
    }
  }
}
export function combineReducers(reducers) {
  if (kindOf(reducers) !== "object") {
    throw new Error(
      `Reducers value should be an object, not ${kindOf(reducers)}`
    );
  }

  const finalReducers = {};
  for (const reducerKey in reducers) {
    const reducer = reducers[reducerKey];
    if (typeof reducer !== "function") {
      throw new Error(
        `Reducer should be a function, but the current is: ${kindOf(reducer)}`
      );
    }

    finalReducers[reducerKey] = reducer;
  }

  let shapeError;
  try {
    assertReducersShape(finalReducers);
  } catch (e) {
    shapeError = e;
  }

  return function (state, action) {
    if (shapeError) {
      throw new Error(shapeError);
    }

    let prevState = state;
    let nextState = {};
    let hasChanged = false;
    for (const reducerKey in finalReducers) {
      const reducer = finalReducers[reducerKey];
      const prevReducerState = prevState?.[reducerKey];
      const newState = reducer(prevReducerState, action);

      if (typeof newState === "undefined") {
        throw new Error(
          `Reducer ${reducerKey} returns undefined for action ${JSON.stringify(
            action
          )}`
        );
      }
      nextState[reducerKey] = newState;

      hasChanged = hasChanged || newState !== prevReducerState;
    }

    hasChanged =
      hasChanged ||
      Object.keys(prevState).length !== Object.keys(nextState).length;

    return hasChanged ? nextState : prevState;
  };
}
