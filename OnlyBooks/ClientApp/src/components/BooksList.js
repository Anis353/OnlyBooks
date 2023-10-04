import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';
import './BooksList.css';
import { fetchBookDetails } from '../utils/api.js';
import { Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity } from '../redux/cartReducer';

function BooksList() {
    const [books, setBooks] = useState([]);
    const { filter } = useParams();
    const { title } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(24);
    const [totalPage, setTotalPage] = useState(0);
    const [sortBooks, setSortBooks] = useState([]);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        // Проверяем значение в локальном хранилище
        const savedSort = localStorage.getItem('selectedSort');
        if (savedSort) {
            setSortBooks(savedSort);
        }

        const savedCurrentPage = localStorage.getItem('currentPage');
        if (savedCurrentPage) {
            setCurrentPage(parseInt(savedCurrentPage));
        }
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`api/books/GetBooksPagination?${filter}`, {
                    params: {
                        _page: currentPage,
                        _limit: booksPerPage,
                        sort: sortBooks,
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
    }, [filter, currentPage, booksPerPage, sortBooks]);

    // Обновляем значение currentPage в локальном хранилище при его изменении
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    const addToCartHandler = (book) => {
        const discountPercentage = book.discounts[0].discountPercentage;
        const newItem = {
            id: book.bookId,
            image: book.coverImage,
            title: book.title,
            price: book.price,
            discountPrice: Math.floor(book.price * (1 - discountPercentage / 100)),
        };

        // Проверка дублирования
        const existingItem = cart.find((item) => item.id === newItem.id);
        if (existingItem) {
            // Если товар уже есть, увеличиваем его количество на 1
            dispatch(increaseQuantity(existingItem.id));
        } else {
            // Если товара нет в корзине, добавляем его
            dispatch(addToCart(newItem));
        }
    };

    const handleSortChange = (e) => {
        // Удаляем сохранения страницы пагинации
        localStorage.removeItem('currentPage');
        setCurrentPage(1);

        const selectedSort = e.target.value;
        setSortBooks(selectedSort);
        // Добавляем сохранения для списка фильтра
        localStorage.setItem('selectedSort', selectedSort);
    };

    return (
        <div className='content'>
            <div className='books-title'><span>{title}</span></div>
            <select name="filter" value={sortBooks} onChange={handleSortChange}>
                <option value="" disabled>Сортировка</option>
                <option value="date-down">Сначала новые</option>
                <option value="date-up">Сначала старые</option>
                <option value="rate-down">По убыванию рейтинга</option>
                <option value="rate-up">По возрастанию рейтинга</option>
                <option value="price-down">Сначало дорогие</option>
                <option value="price-up">Сначало дешевые</option>
            </select>
            <div className="books-list">
                {books.map((book) => (
                    <div className="book" key={book.bookId}>
                        <Fade>
                            <a href={`/book/${book.bookId}`}>
                                <img src={book.coverImage} alt={book.title} />
                                <div className='price-container'>
                                    <BookDetails bookId={book.bookId} />
                                </div>
                                <h3>{book.title}</h3>

                            </a>
                            <div className="button-container">
                                <button className="basket-button" onClick={() => addToCartHandler(book)}>В корзину</button>
                                <button title="Отложить" className='postpone-button'>
                                    <img src="/images/icons/icon-like.png" alt="отложить" />
                                </button>
                            </div>
                        </Fade>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalPage / booksPerPage)}
                onPageChange={paginate}
            />
        </div>
    );
}
function BookDetails({ bookId }) {
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const details = await fetchBookDetails(bookId);
            setBookDetails(details);
        };
        fetchData();

    }, [bookId]);

    if (!bookDetails) {
        return null;
    }

    return (
        <>
            {bookDetails.discount ? (
                <>
                    <span className="discount-price">
                        {(
                            bookDetails.price *
                            (1 - bookDetails.discount / 100)
                        ).toFixed(0)}
                    </span>
                    <span className="original-price">
                        <s>{bookDetails.price}</s>
                    </span>
                    <span className="discount-percentage">- {bookDetails.discount}%</span>
                </>
            ) : (
                <span className="price">{bookDetails.price}</span>
            )}
            <div className="author">{bookDetails.author}</div>
        </>
    );
}

export default BooksList;