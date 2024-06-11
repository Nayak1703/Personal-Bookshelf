import React from 'react';
import BookList from './bookList.jsx';
import MyLibrary from './myLibrary.jsx';
import {Routes, Route} from 'react-router-dom';


const Home = () => {

    return (
        <Routes>
            <Route path="/" element={<BookList/>}/>
            <Route path="/mylibrary" element={<MyLibrary/>} />
        </Routes>
    )
}

export default Home 