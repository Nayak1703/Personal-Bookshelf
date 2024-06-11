import React, { useState, useEffect, useRef } from "react";

const BookCard = (bookDetails) => {
  const [btnClicked, setBtnClicked] = useState(false);

  const count = useRef(0)

  useEffect(()=>{
    const dataRetrive = localStorage.getItem("selectedBooks");
    const localStoData = JSON.parse(dataRetrive)
    if(localStoData) {
        localStoData.map((book)=>{
            if(book.title === bookDetails.title && book.editionCount === bookDetails.editionCount) {
                count.current++;
            }
        })
    }


    if(count.current>0)
        setBtnClicked(true)
  },[])
 

  return (
    <div className="book-card">
      <p className="book-title">
        <strong>Book Title:</strong> {bookDetails.title}{" "}
      </p>
      <p className="edition-count">
        <strong>Edition Count:</strong> {bookDetails.editionCount}{" "}
      </p>
      <button
        className={btnClicked ? "book-card-btn-off" : "book-card-btn-on"}
        onClick={(e) => {
        setBtnClicked(true)
          bookDetails.addLs({
            title: bookDetails.title,
            editionCount: bookDetails.editionCount,
          });
        }}
      >
        Add to Bookshelf
      </button>
    </div>
  );
};

export default BookCard;
