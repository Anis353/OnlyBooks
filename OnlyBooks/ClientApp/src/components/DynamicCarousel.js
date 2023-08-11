import React, { useEffect, useRef, useState } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import axios from 'axios';
import "./Carousel.css";

const DynamicCarousel = ({ carouselId, filter }) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const flickityInstanceRef = useRef(null);

    // Условие фильтрации
    const filterFunction = new Function('book', `return ${filter};`);

    useEffect(() => {
        const fetchData = async () => {
            if (fetching) {
                try {
                    const response = await axios.get(`api/books/GetBooksPagination?_limit=10&_page=${currentPage}`);
                    const newBooks = response.data;
                    setBooks(prevBooks => [...prevBooks, ...newBooks]);
                    setCurrentPage(prevState => prevState + 1);
                } catch (error) {
                    console.error('Ошибка загрузки данных: ', error);
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
                    groupCells: 4,
                    pauseAutoPlayOnHover: false,
                    draggable: false,
                    freeScroll: true,
                    cellAlign: 'left',
                    selectedAttraction: 0.02,
                    friction: 0.15,
                });
            }

            // Находит новые книги которых нет в карусели
            const newBooksToAdd = books.filter(newBook =>
                !Array.from(flickityInstanceRef.current?.getCellElements() || []).some(
                    cellElement => cellElement.dataset.bookId === newBook.bookId.toString()
                )
            );

            const filteredNewBooksToAdd = newBooksToAdd.filter(filterFunction);

            // Добавление новых книг
            if (filteredNewBooksToAdd.length > 0) {
                const newCells = filteredNewBooksToAdd.map(newBook => makeCell(newBook));
                flickityInstanceRef.current.append(newCells);
            }
        }
    }, [books, filterFunction]);

    function makeCell(book) {
        const cell = document.createElement('div');
        cell.className = 'gallery-cell';
        cell.dataset.bookId = book.bookId;

        const bookInfo = document.createElement('div');
        bookInfo.className = 'book-info';

        const price = document.createElement('span');
        price.className = "book-price";
        price.textContent = book.price;

        const img = document.createElement('img');
        img.src = book.coverImage;
        img.alt = book.title;

        const titleLink = document.createElement('a');
        titleLink.href = '#';
        titleLink.className = 'product-title';
        titleLink.textContent = book.title;

        
        bookInfo.appendChild(img);
        bookInfo.append(price);
        bookInfo.appendChild(titleLink);
        cell.appendChild(bookInfo);

        return cell;
    }

    useEffect(() => {
        if (!fetching) {
            setLoadingMore(false);
        }
    }, [fetching]);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            flickityInstanceRef.current.previous();
        }
    };

    const handleNextClick = async () => {
        if (flickityInstanceRef.current && !loadingMore) {
            const currentSlideIndex = flickityInstanceRef.current.selectedIndex;
            const totalSlides = flickityInstanceRef.current.slides.length;

            if (currentSlideIndex === totalSlides - 2) {
                setLoadingMore(true);
                setFetching(true);
            }

            setTimeout(() => {
                flickityInstanceRef.current.next();
            }, 100); // Задержка прокрутки
        }
    };

    return (
        <div className="dynamic-carousel">
            <div className="controls">
                <button onClick={handlePrevClick}><img src="/images/icons/icon-left.png" alt="влево" /></button>
                <button onClick={handleNextClick}><img src="/images/icons/icon-right.png" alt="вправо" /></button>
            </div>
                <div id={carouselId} className="gallery"></div>
        </div>
    );
};

export default DynamicCarousel;
