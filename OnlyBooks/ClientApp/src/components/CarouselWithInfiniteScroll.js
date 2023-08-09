import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import axios from 'axios';
import "./Carousel.css";

const CarouselWithInfiniteScroll = ({ carouselId }) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [scrollEnabled, setScrollEnabled] = useState(true); // Добавили состояние для разрешения/запрета скролла
    const carouselRef = useRef(null);
    const flickityInstanceRef = useRef(null);
    const [hasMoreBooks, setHasMoreBooks] = useState(true);


    const fetchBooks = async () => {
        try {
            const response = await axios.get(`api/books/GetBooksPagination?_limit=10&_page=${currentPage}`);
            const newBooks = response.data;
            setBooks(newBooks); 
            const totalItems = parseInt(response.headers['x-total-count'], 10);
            if (currentPage * 10 >= totalItems) {
                setHasMore(false);
            } else {
                setCurrentPage(prevPage => prevPage + 1);
            }
            console.log("Loaded books:", newBooks.length);
        } catch (error) {
            console.error('Error fetching data:', error);
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (carouselRef.current && books.length > 0) {
            flickityInstanceRef.current = new Flickity(carouselRef.current, {
                prevNextButtons: false,
                pageDots: false,
                contain: true,
                cellAlign: 'center'
            });

            return () => {
                flickityInstanceRef.current.destroy();
            };
        }
    }, [books]);

    const handlePrevClick = () => {
        fetchBooks();
    };

    const handleNextClick = () => {
        if(flickityInstanceRef.current) {
            const currentSlideIndex = flickityInstanceRef.current.selectedIndex;
            const totalSlides = flickityInstanceRef.current.slides.length;

            if (currentSlideIndex === totalSlides - 2) {
                if (hasMore) {
                    fetchBooks();
                }
            }

            flickityInstanceRef.current.next();
        }
    };

    const handleScroll = (event) => {
        const carouselContainer = document.getElementById(carouselId);

        if (carouselContainer) {
            if (!carouselContainer.contains(event.target)) {
                setScrollEnabled(false); // Запретить бесконечную загрузку
            } else {
                setScrollEnabled(true); // Разрешить бесконечную загрузку
            }
        }
    };
    const handleBookUpdate = (newBooks) => {
        // Предотвращение автоматического скролла
        setScrollEnabled(false);

        // Обновление списка книг
        setBooks(newBooks);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [carouselId]);

    return (
        <div>
            <div className="carousel-container">
                <InfiniteScroll
                    dataLength={books.length}
                    next={fetchBooks}
                    hasMore={hasMore && scrollEnabled} // Используем scrollEnabled для разрешения/запрета загрузки
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more books to load.</p>}
                    scrollableTarget="carousel-container"
                >
                    <div ref={carouselRef} id={carouselId} className="gallery" key={books.length}>
                        {books.map((book, index) => (
                            <div key={index} className="gallery-cell">
                                {/* Ваши данные и структура для каждого элемента */}
                                <img src={book.coverImage} alt={book.title} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
            <div className="controls">
                <button onClick={handlePrevClick}>Previous</button>
                <button onClick={handleNextClick} disabled={!hasMore}>Next</button>
            </div>
        </div>
    );
};

export default CarouselWithInfiniteScroll;
