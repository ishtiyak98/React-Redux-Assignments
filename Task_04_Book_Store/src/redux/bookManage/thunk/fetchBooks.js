import { loadFromServer } from "../action";

const fetchBooks = async (dispatch, getState) => {
  const response = await fetch("http://localhost:9000/books");
  const books = await response.json();

  dispatch(loadFromServer(books));
};

export default fetchBooks;
