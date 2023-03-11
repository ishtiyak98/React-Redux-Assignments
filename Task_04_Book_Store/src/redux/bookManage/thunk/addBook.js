import { addBookData } from "../action";

const addBook = (data) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:9000/books", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    const result = await response.json();

    if (result) {
      dispatch(addBookData(result));
    } else {
      window.alert("can't upload....Server error");
    }
  };
};

export default addBook;
