import React, { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import "./Carousel.css";

const Carousel = ({ items, carouselId, autoPlay }) => {
    const flickityRef = useRef(null);

    useEffect(() => {
        if (flickityRef.current) {
            flickityRef.current.destroy();
        }
        flickityRef.current = new Flickity(`#${carouselId}`, {
            prevNextButtons: true,
            pageDots: true,
            freeScroll: autoPlay ? false : true,
            initialIndex: 0,
            cellAlign: 'left',
            contain: true,
            groupCells: 1,
            wrapAround: autoPlay ? true : false,   
            autoPlay: autoPlay ? 5000 : false,
            pauseAutoPlayOnHover: false,
            selectedAttraction: 0.01,
            friction: 0.15,
        });
    }, [items, carouselId, autoPlay]);

    return (
        <div id={carouselId} className="gallery js-flickity">
            {items.map((item) => (
                <a key={item.bookId} className="gallery-cell" href={`/book/${item.bookId}`}>
                    <img src={item.coverImage} alt={item.title} />
                    {item.discount > 0 && ( // Показываем элемент скидки только если есть скидка
                        <div className="discount-label">
                            {`${item.discount}%`}
                        </div>
                    )}
                </a>
            ))}
        </div>
    );
};

export default Carousel;