import { removeBookData } from "../action";

const removeBook = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/books/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    dispatch(removeBookData(id));
  };
};

export default removeBook;
