import { updateBookData } from "../action";

const updateBook = (id, data) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    const result = await response.json();
    if (result) {
      dispatch(updateBookData(result));
    }
  };
};

export default updateBook;
