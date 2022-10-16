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
      return {
        ...state,
        writers: [...state.writers, { writerName: payload.writerName, id }],
      };

    case booksActionType.DELETE_WRITER:
      state.writers.splice(payload.index, 1);
      return { ...state, writers: state.writers };

    case booksActionType.ADD_BOOK: {
      const booksLength = state.books.length;
      const bookId = booksLength ? state.books[booksLength - 1].id + 1 : 1;
      return { ...state, books: [...state.books, { ...payload, id: bookId }] };
    }

    case booksActionType.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((item) => item.id == payload.id),
      };

    default:
      return { ...state };
  }
}
