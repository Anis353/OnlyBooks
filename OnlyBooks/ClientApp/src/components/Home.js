import "./Home.css";
import React, { useEffect, useState } from 'react';
import { fetchBooksAndDiscounts } from "./api.js";
import Carousel from "./Carousel";
import DynamicCarousel from "./DynamicCarousel";
import { Fade } from "react-awesome-reveal";
export function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const booksWithDiscounts = await fetchBooksAndDiscounts();
            setBooks(booksWithDiscounts);
        };

        fetchData();
    }, []);

    return (
        <div className="wrapper">
            <Fade>
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
                </Fade>
            <div className="main-content">
                <div className="hits">
                    <Fade>
                        <h2>Хиты продаж. Распродажа</h2>
                        <DynamicCarousel carouselId="hits" filter="book.rate > 8" />
                    </Fade>
                </div>
                </div>
        </div>
    );
}
