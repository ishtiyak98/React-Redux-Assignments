import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addBook from "../../redux/bookManage/thunk/addBook";
import updateBook from "../../redux/bookManage/thunk/updateBook";

const BookForm = () => {
  const { editBook, editBookDetails } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [bookDetails, setBookDetails] = useState({
    name: "",
    author: "",
    thumbnail: "",
    price: "",
    rating: "",
    featured: false,
  });

  useEffect(() => {
    if (editBook) {
      setBookDetails({ ...editBookDetails });
    }
  }, [editBook, editBookDetails]);

  const editName = (e) => {
    setBookDetails({ ...bookDetails, name: e.target.value });
  };

  const editAuthor = (e) => {
    setBookDetails({ ...bookDetails, author: e.target.value });
  };

  const editThumbnail = (e) => {
    setBookDetails({ ...bookDetails, thumbnail: e.target.value });
  };

  const editPrice = (e) => {
    setBookDetails({ ...bookDetails, price: parseInt(e.target.value) });
  };

  const editRating = (e) => {
    setBookDetails({ ...bookDetails, rating: parseInt(e.target.value) || "" });
  };

  const editFeatured = (e) => {
    console.log(e.target.checked);
    setBookDetails({ ...bookDetails, featured: e.target.checked });
  };

  const handleForm = (e) => {
    e.preventDefault();
    
    if (!editBook) {
      dispatch(addBook(bookDetails));
    } else {
      dispatch(updateBook(editBookDetails.id, bookDetails));
    }
    setBookDetails({
      name: "",
      author: "",
      thumbnail: "",
      price: "",
      rating: "",
      featured: false,
    });
  };

  return (
    <>
      <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
        <h4 className="mb-8 text-xl font-bold text-center">
          {editBook ? "Edit A Book" : "Add New Book"}
        </h4>
        <form className="book-form" onSubmit={handleForm}>
          <div className="space-y-2">
            <label htmlFor="name">Book Name</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookname"
              name="name"
              value={bookDetails.name}
              onChange={editName}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category">Author</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookauthor"
              name="author"
              value={bookDetails.author}
              onChange={editAuthor}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image">Image Url</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookthumbnail"
              name="thumbnail"
              value={bookDetails.thumbnail}
              onChange={editThumbnail}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 pb-4">
            <div className="space-y-2">
              <label htmlFor="price">Price</label>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookprice"
                name="price"
                value={bookDetails.price}
                onChange={editPrice}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity">Rating</label>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookrating"
                name="rating"
                min="1"
                max="5"
                value={bookDetails.rating}
                onChange={editRating}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="input-Bookfeatured"
              type="checkbox"
              name="featured"
              className="w-4 h-4"
              checked={bookDetails.featured}
              onChange={editFeatured}
            />
            <label htmlFor="featured" className="ml-2 text-sm">
              {" "}
              This is a featured book{" "}
            </label>
          </div>

          <button type="submit" className="submit" id="submit">
            {editBook ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
};

export default BookForm;
