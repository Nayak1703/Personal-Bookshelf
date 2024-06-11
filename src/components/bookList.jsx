import React, { useState, useEffect, useRef } from "react";
import "../style/bookList.css";
import BookCard from "./bookCard.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from 'react-router-dom';

const BookList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [localDataSet,setlocalDataSet] = useState([])


  const selectedBook = useRef([])
  const addSelectedBookInLocalStorage = (bookInfo) => {
    selectedBook.current.push(bookInfo)
    const selectedBookStr = JSON.stringify(selectedBook.current);
    localStorage.setItem("selectedBooks", selectedBookStr)
  }


  const fetchBookData = async () => {
    try {
        setLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchValue}&limit=10&page=1`
      );
      const bookDataJson = await response.json();

      const bookDataJsonArray = bookDataJson.docs;
      setBookData(bookDataJsonArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeOutID = setTimeout(()=>fetchBookData(), 800);
        
    return  ()=>clearTimeout(timeOutID)
  }, [searchValue]);

  return (
    <div className="bookPage">
      <div className="book-navbar">
        <label className="searchDiv">
          <p>Search by book name:</p>
          <input
            type="input"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Enter book name"
          />
        </label>

        <Link
          to={`/mylibrary`}>
          <button className="bookShelf-btn">My Bookshelf</button>
        </Link>
      </div>

      <div className="book-list">
        {!loading ? (
          bookData
            .map((book,index) => (
              <BookCard
                key={index}
                title={book.title}
                editionCount={book.edition_count}
                addLs = {addSelectedBookInLocalStorage}
              />
            ))
            .slice(0, 10)
        ) : (
          <div className="loadingIcon">
            <CircularProgress />
          </div>
        )}
        {}
      </div>
    </div>
  );
};

export default BookList;
