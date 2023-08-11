import React, { useEffect, useRef, useState } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import axios from 'axios';
import "./Carousel.css";

const CarouselWithInfiniteScroll = ({ carouselId }) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const flickityInstanceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (fetching) {
                try {
                    const response = await axios.get(`api/books/GetBooksPagination?_limit=10&_page=${currentPage}`);
                    const newBooks = response.data;
                    setBooks(prevBooks => [...prevBooks, ...newBooks]);
                    setCurrentPage(prevState => prevState + 1);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setFetching(false);
                }
            }
        };

        fetchData();
    }, [fetching, currentPage]);

    useEffect(() => {
        if (books.length > 0) {
            if (!flickityInstanceRef.current) {
                flickityInstanceRef.current = new Flickity(`#${carouselId}`, {
                    prevNextButtons: false,
                    pageDots: false,
                    contain: true,
                    groupCells: 5
                });
                flickityInstanceRef.current.on('dragMove', scrollHandler);
            }

            // Находит новые книги которых нет в карусели
            const newBooksToAdd = books.filter(newBook =>
                !Array.from(flickityInstanceRef.current?.getCellElements() || []).some(
                    cellElement => cellElement.dataset.bookId === newBook.bookId.toString()
                )
            );

            // Добавление новых книг
            if (newBooksToAdd.length > 0) {
                const newCells = newBooksToAdd.map(newBook => makeCell(newBook));
                flickityInstanceRef.current.append(newCells);
            }
        }
    }, [books]);


    function makeCell(book) {
        const cell = document.createElement('div');
        cell.className = 'gallery-cell';
        cell.dataset.bookId = book.bookId; // Set dataset to identify book
        cell.innerHTML = `<img src="${book.coverImage}" alt="${book.title}" />`;

        return cell;
    }

    const scrollHandler = () => {
        if (flickityInstanceRef.current && !loadingMore) {
            const currentSlideIndex = flickityInstanceRef.current.selectedIndex;
            const totalSlides = flickityInstanceRef.current.slides.length;

            if (currentSlideIndex === totalSlides - 1) {
                setLoadingMore(true);
                setFetching(true);
            }
        }
    };

    useEffect(() => {
        if (!fetching) {
            setLoadingMore(false);
        }
    }, [fetching]);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            flickityInstanceRef.current.previous();
            setHasMore(true);
        }
    };

    const handleNextClick = async () => {
        if (flickityInstanceRef.current && !loadingMore) {
            const currentSlideIndex = flickityInstanceRef.current.selectedIndex;
            const totalSlides = flickityInstanceRef.current.slides.length;

            if (currentSlideIndex === totalSlides - 1) {
                setLoadingMore(true);
                setFetching(true);
            }

            setTimeout(() => {
                flickityInstanceRef.current.next();
            }, 100); // Задержка прокрутки
        }
    };

    return (
        <div>
            <div className="carousel-container">
                <div id={carouselId} className="gallery"></div>
            </div>
            <div className="controls">
                <button onClick={handlePrevClick}>Previous</button>
                <button onClick={handleNextClick} disabled={!hasMore}>Next</button>
            </div>
        </div>
    );
};

export default CarouselWithInfiniteScroll;
