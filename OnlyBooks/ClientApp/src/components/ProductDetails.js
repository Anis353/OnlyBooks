import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from './api';
import "./ProductDetails.css";
import RatingArea from './RatingArea.js';

function BookDetailsPage() {
    const { id } = useParams(); // Получите ID книги из URL
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            const bookDetails = await fetchBookDetails(id);
            setBook(bookDetails); // Ожидаемый объект
        }

        fetchDetails();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>; // Или покажите какой-то загрузочный элемент
    }

    return (
        <div className="wrapper">
            <div className="product-info">
                <p className="product-category">
                    {book.category.map((category, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && ' > '}
                        {category}
                    </React.Fragment>))}</p>
                <h1 className="product-title">{book.title}</h1>
                <div className="product-details">
                    <div className="product-details-cover">
                <img src={book.coverImage} alt={book.title} />
                    </div>
                    <div className="product-details-left">
                        <p className="product-author">Автор: {book.author}</p>
                        <p className="product-publisher">Издательство: {book.publisher}, {book.publicationYear}</p>
                        <p className="product-category">Раздел: {book.category[1]}</p>
                        {book.genre.length > 0 ?
                            <p>Жанр:&nbsp;
                                {book.genre.map((genre, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && ', '}
                                        {genre}
                                    </React.Fragment>))}</p> : ''}
                        <div className="buying">
                            <div className="buying-price">
                                <span>Цена: </span>
                                {book.discount > 0 ?
                                    <div className='buying-discount'>
                                        <span className='origin-price'>{book.price}</span>
                                        <span className='discount-price'>{Math.floor(book.price * (1 - book.discount / 100))}</span>
                                        <span className='percent-price'>-{book.discount}%</span>
                                    </div>
                                    :
                                    <span className='origin-price' style={{ display: 'inline-block' }}> {book.price}</span>
                                }
                            </div>
                            <div className='product-button'>
                            <button type='button'>
                                <span>Добавить в корзину</span>
                                </button>
                            </div>
                            <div className='product-icons'>
                                <a href='#' className='fave'>
                                    <span>Добавить в отложенные</span>
                                </a>
                                <a href='#' className='compare'>
                                    <span>+ к сравнению</span>
                                </a>
                            </div>
                        </div>
                        <div className="articul">ID товара: {book.bookId}</div>
                        <div className="isbn">ISBN: {book.isbn}</div>
                        <div className="pages2">Страниц: {book.pageCount}</div>
                    </div>
                    <div className="product-details-right">
                        <div className='product-rating'>
                            <div className='product-rating-body'>
                                <div className='left'>
                                    Рейтинг
                                    <div className='rate'>
                                        {book.rate.toFixed(2)}
                                    </div>
                                </div>
                                <div className='right'>
                                    <RatingArea />
                                </div>
                            </div>
                        </div>
                        <div className='product-description'></div>
                        <p className='product-description-title'>Аннотация к книге {book.title}</p>
                        <p className="product-description-text">{book.description}</p>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default BookDetailsPage;
