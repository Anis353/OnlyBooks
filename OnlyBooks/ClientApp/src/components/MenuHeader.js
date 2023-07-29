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
								<li><a href="#">Билингвы</a>
									<ul>
										<li><a href="#">Все книги жанра</a></li>
										<li><a href="#">Билингвы для детей</a></li>
										<li><a href="#">Билингвы. Английский язык</a></li>
										<li><a href="#">Билингвы. Другие языки</a></li>
									</ul>
								</li>
								<li><a href="#">Книги для детей</a>
									<ul>
										<li><a href="#">Все книги жанра</a></li>
										<li><a href="#">Детская художественная литература</a></li>
										<li><a href="#">Детский досуг</a></li>
										<li><a href="#">Познавательная литература для детей</a></li>
									</ul>
								</li>
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
						<li><a href="#">Школа</a>
							<ul>
								<li><a href="#">Русский язык</a></li>
								<li><a href="#">Английский язык</a></li>
								<li><a href="#">Математика</a></li>
								<li><a href="#">Окружающий мир</a></li>
								<li><a href="#">История</a></li>
								<li><a href="#">Литература. Чтение</a></li>
								<li><a href="#">Физика. Астрономия</a></li>
								<li><a href="#">Биология. Экология</a></li>
								<li><a href="#">География</a></li>
							</ul>
						</li>
						<li><a href="#">Канцтовары</a>
						</li>
						<li><a href="#">Приложения</a></li>
					</ul>
				</nav>
            </div>
        </div>
    );
};

export default MenuHeader;
