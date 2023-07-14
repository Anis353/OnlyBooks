import React, { useState } from 'react';
import './NavMenu.css';

const MenuHeader = () => {

    return (
        <div className="menu-header">
            <div className="menu-header-category">
				<nav>
					<ul>
						<li><a href="#">Книги</a>
							<ul>
								<li><a href="#">Главные 2023</a></li>
								<li><a href="#">Все книги</a></li>
								<li><a href="#">Билингвы</a></li>
								<li><a href="#">Комиксы, Манга</a></li>
								<li><a href="#">Нехудожественная литература</a></li>
								<li><a href="#">Религия</a></li>
								<li><a href="#">Художественная литература</a></li>
								<li><a href="#">Молодежная литература</a></li>
							</ul>
						</li>

						<li><a href="#">Иностранные</a>
							<ul>
								<li><a href="#">Все книги на иностранном языке</a></li>
								<li><a href="#">Книги на английском языке</a></li>
								<li><a href="#">Книги на других языках</a></li>
								<li><a href="#">Книги на испанском языке</a></li>
								<li><a href="#">Книги на итальянском языке</a></li>
								<li><a href="#">Книги на немецком языке</a></li>
								<li><a href="#">Книги на французском языке</a></li>
							</ul>
						</li>
						<li><a href="#">Главное</a></li>
						<li><a href="#">Школа</a></li>
						<li><a href="#">Канцтовары</a></li>
						<li><a href="#">Приложения</a></li>
					</ul>
				</nav>
            </div>
        </div>
    );
};

export default MenuHeader;
