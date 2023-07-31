import "./Home.css";
import React, { useEffect, useState } from 'react';
import Carousel from "./Carousel";

export function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("api/books/GetBooks")
            .then(response => response.json())
            .then(responseJson => {
                setBooks(responseJson);
            })
    }, []);

    return (
        <div className="wrapper">
            <div className="row">
                <div className="best-books">
                    <h3>Лучшие книги по рейтингу</h3>
                    <Carousel items={books} />
                </div>
               
            </div>
        </div>
    );
}
