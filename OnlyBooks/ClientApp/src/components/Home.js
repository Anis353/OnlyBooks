import "./Home.css";
import React, { useEffect, useState } from 'react';
import Carousel from "./Carousel";
import InfiniteScroll from './CarouselWithInfiniteScroll';

export function Home() {
    const [books, setBooks] = useState([]);
    const[nextPage, setNextPage] = useState(1);

    useEffect(() => {
        // Загружаем данные о книгах и скидках с помощью двух запросов fetch
        const fetchData = async () => {
            const booksResponse = await fetch(`api/books/GetBooks`);
            const booksData = await booksResponse.json();

            const discountsResponse = await fetch("api/books/GetDiscounts");
            const discountsData = await discountsResponse.json();

            // Объединяем данные о книгах и скидках по ID книги
            const booksWithDiscounts = booksData.map((book) => {
                const discountInfo = discountsData.find((discount) => discount.bookId === book.bookId);
                return { ...book, discount: discountInfo ? discountInfo.discountPercentage : 0 };
            });

            setBooks(booksWithDiscounts);
        };

        fetchData();
    }, []);

    const loadMoreBooks = () => {
        setNextPage((prevPage) => prevPage + 1);
    };


    return (
        <div className="wrapper">
            <div className="top-content">
                <div className="main-banners-wrapper">
                    <div className="discount-books">
                        <Carousel items={books.filter((book) => book.discount > 0).slice(0, 10)} carouselId="discount-books" autoPlay={true} />
                    </div>
                 <div className="right-banner">
                    <div className="best-books">
                            <h4>Лучшие книги по рейтингу</h4>
                        <Carousel items={books.filter((book) => book.rate > 7).slice(0, 30)} carouselId="best-books" />
                        </div>
                        <div className="more_books">
                            <a href="#">Больше книг по скидкам</a>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="main-content">
                <div className="hits">
                    <h2>Хиты продаж. Распродажа</h2>
                    <InfiniteScroll carouselId="hits" />
                </div>
            </div>
        </div>
    );
}
