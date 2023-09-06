import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination'
import "./Carousel.css";
import './BooksList.css';
import { Fade } from "react-awesome-reveal";

function BooksList() {
    const [books, setBooks] = useState([]);
    const { filter } = useParams();
    const { title } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(24);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`api/books/GetBooksPagination?${filter}`, {
                    params: {
                        _page: currentPage,
                        _limit: booksPerPage,
                    }
                });

                // Получаем общее количество книг из заголовка ответа
                const totalBooks = parseInt(response.headers['x-total-books']);
                setTotalPage(totalBooks);

                // Устанавливаем данные книг из ответа
                setBooks(response.data);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Ошибка при загрузке книг:', error);
            }
        };

        fetchBooks();
    }, [filter, currentPage, booksPerPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='content'>
            <div className='books-title'><span>{title}</span></div>
            <div className="books-list">
              
                {books.map((book) => (
                    <div className="book" key={book.bookId}>
                        <Fade>
                        <a href={`/book/${book.bookId}`}>
                                <img src={book.coverImage} alt={book.title} />
                                <span>{book.price}</span>
                            <h3>{book.title}</h3>
                            </a>
                        </Fade>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalPage / booksPerPage)} // Используем общее количество книг
                onPageChange={paginate}
            />
            </div>
    );
}

export default BooksList;
