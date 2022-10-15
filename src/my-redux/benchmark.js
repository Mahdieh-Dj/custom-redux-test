/* eslint-disable */

import {
  createStore as defaultCreateStore,
  combineReducers as defaultCombineReducers,
} from "redux";
import {
  createStore as pairCreateStore,
  combineReducers as pairCombineReducers,
} from "./pair";
import { articleListActions, articleList } from "./reducers/articleList";
import { bookList, bookListActions } from "./reducers/bookList";
import { booksActionType, booksReducer } from "./reducers/booksLibrary";
import { cardActions, cart } from "./reducers/cart";
import { clientsActions, clientsReducer } from "./reducers/clients";
import { counterActions, counterReducer } from "./reducers/counter";
import { phoneReducer, actionPhoneReducer } from "./reducers/phone";
import { timerActions, timerReducer } from "./reducers/timer";
import { todos, todosActions } from "./reducers/todos";
export var suite = new Benchmark.Suite("Redux Benchmark");

suite
  .add("Default", async () => {
    const defaultCombinedReducers = defaultCombineReducers({
      articleList: articleList,
      bookList: bookList,
      bookLibrary: booksReducer,
      cart: cart,
      clients: clientsReducer,
      counter: counterReducer,
      phone: phoneReducer,
      timer: timerReducer,
      todos: todos,
      cart2: cart,
      clients2: clientsReducer,
      counter2: counterReducer,
      phone2: phoneReducer,
      timer2: timerReducer,
    });
    const defaultStore = defaultCreateStore(defaultCombinedReducers);

    for (let index = 0; index < 50; index++) {
      if (index % 10 === 0) {
        defaultStore.dispatch({
          type: bookListActions.ADD_USER,
          payload: { user: { name: "ali", books: ["a", "b"] } },
        });
      } else if (index % 2 === 0) {
        defaultStore.dispatch({
          type: counterActions.increment,
        });
      } else {
        defaultStore.dispatch({
          type: todosActions.ADD_TODO,
          text: "newTask",
        });
      }
    }
  })
  .add("Pair", async () => {
    const pairCombinedReducers = pairCombineReducers({
      articleList: articleList,
      bookList: bookList,
      bookLibrary: booksReducer,
      cart: cart,
      clients: clientsReducer,
      counter: counterReducer,
      phone: phoneReducer,
      timer: timerReducer,
      todos: todos,
      cart2: cart,
      clients2: clientsReducer,
      counter2: counterReducer,
      phone2: phoneReducer,
      timer2: timerReducer,
    });
    const pairStore = pairCreateStore(pairCombinedReducers);

    for (let index = 0; index < 50; index++) {
      if (index % 10 === 0) {
        pairStore.dispatch({
          type: bookListActions.ADD_USER,
          payload: { user: { name: "ali", books: ["a", "b"] } },
          reducer: "bookList",
        });
      } else if (index % 2 === 0) {
        pairStore.dispatch({
          type: counterActions.increment,
          reducer: "counter",
        });
      } else {
        pairStore.dispatch({
          type: todosActions.ADD_TODO,
          text: "newTask",
          reducer: "todos",
        });
      }
    }
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
export default suite;
