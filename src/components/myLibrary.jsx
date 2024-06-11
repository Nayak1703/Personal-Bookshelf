import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const MyLibrary = () => {
  const [selectedBookList, setSelectedBookList] = useState([]);
  

  useEffect(() => {
    const dataRetrive = localStorage.getItem("selectedBooks");
    const localStoData = JSON.parse(dataRetrive);
    if(localStoData)
        setSelectedBookList(localStoData);
  }, []);

  return (
    <div className="selected-book-page">
        {/* <div className="selected-page-BtnDiv"> */}
        <Link to={"/"}><button className="selected-bookShelf-btn">Add books</button></Link>
        {/* </div> */}
        
        <div className="selected-book-lists">
        {selectedBookList.map((book) => (
        <div className="selected-book-card">
          <p className="selected-book-title">
            <strong>Book Title:</strong> {book.title}{" "}
          </p>
          <p className="selected-edition-count">
            <strong>Edition Count:</strong> {book.editionCount}{" "}
          </p>
        </div>
      ))}
        </div>
      
    </div>
  );
};

export default MyLibrary;
