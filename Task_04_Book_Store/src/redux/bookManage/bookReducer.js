import {
  ADD_BOOK,
  EDIT_BOOK,
  LOAD_FROM_SERVER,
  REMOVE_BOOK,
  SEARCH_BOOK,
  UPDATE_BOOK_INFO,
} from "./actionTypes";

const initialState = {
  allBooks: [],
  editBook: false,
  editBookDetails: {},
  searchKeywords: "",
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FROM_SERVER:
      return {
        ...state,
        allBooks: [...action.payload],
      };
    case ADD_BOOK:
      return {
        ...state,
        allBooks: [...state.allBooks, { ...action.payload }],
      };

    case EDIT_BOOK:
      return {
        ...state,
        editBook: true,
        editBookDetails: { ...action.payload },
      };

    case REMOVE_BOOK:
      return {
        ...state,
        allBooks: state.allBooks.filter((book) => book.id !== action.payload),
      };

    case UPDATE_BOOK_INFO:
      return {
        ...state,
        editBook: false,
        editBookDetails: {},
        allBooks: state.allBooks.map((book) => {
          if (book.id !== action.payload.id) {
            return book;
          } else {
            return {
              ...action.payload,
            };
          }
        }),
      };

    case SEARCH_BOOK:
      return {
        ...state,
        searchKeywords: action.payload,
      };

    default:
      return state;
  }
};

export default bookReducer;
