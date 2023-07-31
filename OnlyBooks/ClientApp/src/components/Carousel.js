import React, { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import "./Carousel.css";

const Carousel = ({ items }) => {
    const flickityRef = useRef(null);

    useEffect(() => {
        if (flickityRef.current) {
            flickityRef.current.destroy();
        }
        flickityRef.current = new Flickity('.gallery', {
            prevNextButtons: true,
            pageDots: true,
            freeScroll: true,
            initialIndex: 0,
            cellAlign: 'left',
            contain: true,
            groupCells: 2
        });
    }, [items]);

    return (
        <div className="gallery js-flickity">
            {items.map((item) => (
                <a key={item.bookId} className="gallery-cell" href={`/book/${item.bookId}`}>
                    <img src={item.coverImage} alt={item.title} />
                </a>
            ))}
        </div>
    );
};

export default Carousel;