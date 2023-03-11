import {
  ADD_BOOK,
  EDIT_BOOK,
  LOAD_FROM_SERVER,
  REMOVE_BOOK,
  SEARCH_BOOK,
  UPDATE_BOOK_INFO,
} from "./actionTypes";

export const loadFromServer = (data) => {
  return {
    type: LOAD_FROM_SERVER,
    payload: data,
  };
};

export const addBookData = (data) => {
  return {
    type: ADD_BOOK,
    payload: data,
  };
};

export const editBook = (data) => {
  return {
    type: EDIT_BOOK,
    payload: data,
  };
};

export const updateBookData = (data) => {
  return {
    type: UPDATE_BOOK_INFO,
    payload: data,
  };
};

export const removeBookData = (id) => {
  return {
    type: REMOVE_BOOK,
    payload: id,
  };
};

export const searchBook = (data) => {
  return {
    type: SEARCH_BOOK,
    payload: data,
  };
};
