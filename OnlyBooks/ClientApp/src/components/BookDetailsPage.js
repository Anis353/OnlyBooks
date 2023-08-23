import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from './api';
import "./BookDetailsPage.css";

function BookDetailsPage() {
    const { id } = useParams(); // Получите ID книги из URL
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            const bookDetails = await fetchBookDetails(id);
            console.log(bookDetails);
            setBook(bookDetails); // Ожидаемый объект
        }

        fetchDetails();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>; // Или покажите какой-то загрузочный элемент
    }

    return (
        <div className="wrapper">
            <div className="book-info">
            <p className="book-category">{book.category}</p>
            <h1 className="book-title">{book.title}</h1>
            <div className="book-details">
            <div className="book-details-cover">
                <img src={book.coverImage} alt={book.title} />
            </div>
            <div className="book-details-info">
                <p className="book-details-author">{book.author}</p>
                <p className="book-details-discount">{book.discount}% off</p>
                <p className="book-details-description">{book.description}</p>
            </div>
                </div>
            </div>
            </div>
    );
}

export default BookDetailsPage;
