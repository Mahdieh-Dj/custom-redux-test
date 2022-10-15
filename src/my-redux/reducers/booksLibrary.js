const bookLibraryInitial = { writers: [], books: [] };

export const booksActionType = {
  ADD_WRITER: "ADD_WRITER",
  DELETE_WRITER: "DELETE_WRITER",
  ADD_BOOK: "ADD_BOOK",
  DELETE_BOOK: "DELETE_BOOK",
};
export function booksReducer(state = bookLibraryInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case booksActionType.ADD_WRITER:
      const writersLength = state.writers.length;
      const id = writersLength ? state.writers[writersLength - 1].id + 1 : 1;
      state.writers.push({ writerName: payload.writerName, id });
      window.localStorage.setItem("writers", JSON.stringify(state.writers));
      return { ...state, writers: state.writers };

    case booksActionType.DELETE_WRITER:
      state.writers.splice(payload.index, 1);
      window.localStorage.setItem("writers", JSON.stringify(state.writers));
      return { ...state, writers: state.writers };

    case booksActionType.ADD_BOOK: {
      const booksLength = state.books.length;
      const bookId = booksLength ? state.books[booksLength - 1].id + 1 : 1;
      state.books.push({ ...payload, id: bookId });
      window.localStorage.setItem("books", JSON.stringify(state.books));
      return { ...state, books: state.books };
    }

    case booksActionType.DELETE_BOOK:
      const indexOfDeleted = state.books.findIndex(
        (item) => item.id === payload.id
      );
      state.books.splice(indexOfDeleted, 1);
      window.localStorage.setItem("books", JSON.stringify(state.books));
      return { ...state, books: state.books };

    default:
      return { ...state };
  }
}
