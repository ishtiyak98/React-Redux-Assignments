import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchBooks from "../../redux/bookManage/thunk/fetchBooks";
import BookCard from "../BookCard/BookCard";
import BookForm from "../BookForm/BookForm";

const StorePage = () => {
  const { allBooks, searchKeywords } = useSelector((state) => state);
  const [isFeatured, setIsFeatured] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks);
  }, [dispatch]);

  return (
    <>
      <main className="py-12 2xl:px-6">
        <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
          <div className="order-2 xl:-order-1">
            <div className="flex items-center justify-between mb-12">
              <h4 className="mt-2 text-xl font-bold">Book List</h4>

              <div className="flex items-center space-x-4">
                <button
                  className={`filter-btn ${!isFeatured && "active-filter"}`}
                  id="lws-filterAll"
                  onClick={() => setIsFeatured(false)}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${isFeatured && "active-filter"}`}
                  id="lws-filterFeatured"
                  onClick={() => setIsFeatured(true)}
                >
                  Featured
                </button>
              </div>
            </div>
            <div className="lws-bookContainer">
              {/* <!-- Card 1 --> */}
              {searchKeywords
                ? isFeatured
                  ? allBooks
                      .filter(
                        (book) =>
                          book.name
                            .toLowerCase()
                            .includes(searchKeywords.toLowerCase()) &&
                          book.featured === true
                      )

                      .map((book) => (
                        <BookCard key={book.id} book={book}></BookCard>
                      ))
                  : allBooks
                      .filter((book) =>
                        book.name
                          .toLowerCase()
                          .includes(searchKeywords.toLowerCase())
                      )
                      .map((book) => (
                        <BookCard key={book.id} book={book}></BookCard>
                      ))
                : isFeatured
                ? allBooks
                    .filter((book) => book.featured === true)
                    .map((book) => (
                      <BookCard key={book.id} book={book}></BookCard>
                    ))
                : allBooks.map((book) => (
                    <BookCard key={book.id} book={book}></BookCard>
                  ))}
              {}
            </div>
          </div>
          <div>
            <BookForm></BookForm>
          </div>
        </div>
      </main>
    </>
  );
};

export default StorePage;
