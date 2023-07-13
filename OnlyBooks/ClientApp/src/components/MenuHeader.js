import React, { useState } from 'react';
import './NavMenu.css';

const MenuHeader = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (dropdownId) => {
        setActiveDropdown(dropdownId);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <div className="menu-header">
            <div className="menu-header-category">
                <button
                    className="menu-button"
                    onMouseEnter={() => handleMouseEnter('books')}
                    onMouseLeave={handleMouseLeave}
                >
                    Книги
                </button>
                {activeDropdown === 'books' && (
                    <div className="category-dropdown">
                        <ul>
                            <li>Категория 1</li>
                            <li>Категория 2</li>
                            <li>Категория 3</li>
                        </ul>
                    </div>
                )}
                <button
                    className="menu-button"
                    onMouseEnter={() => handleMouseEnter('foreign')}
                    onMouseLeave={handleMouseLeave}
                >
                    Иностранные
                </button>
                {activeDropdown === 'foreign' && (
                    <div className="category-dropdown">
                        <ul>
                            <li>Категория 4</li>
                            <li>Категория 5</li>
                            <li>Категория 6</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuHeader;
