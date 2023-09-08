import React from 'react';

// api.js
export async function fetchBooksAndDiscounts() {
    const booksResponse = await fetch("api/books/GetBooks");
    const booksData = await booksResponse.json();

    const discountsResponse = await fetch("api/books/GetDiscounts");
    const discountsData = await discountsResponse.json();

    // Объединяем данные о книгах и скидках по ID книги
    const booksWithDiscounts = booksData.map((book) => {
        const discountInfo = discountsData.find((discount) => discount.bookId === book.bookId);
        return { ...book, discount: discountInfo ? discountInfo.discountPercentage : 0 };
    });

    return booksWithDiscounts;
}

// Информация о скидках
export async function fetchDiscounts() {
    const discountsResponse = await fetch("api/books/GetDiscounts");
    const discountsData = await discountsResponse.json();

    return discountsData;
}

// Информация об авторе
export async function fetchAuthor(bookId) {
    const authorResponse = await fetch(`api/books/GetAuthors?bookId=${bookId}`);
    const authorData = await authorResponse.json();

    return authorData;
}


// Книги по категориям
export async function fetchBooksCategory(categoryId) {
    const categoryResponse = await fetch(`api/books/GetBooksPagination?categoryId=${categoryId}`);
    const categoryData = await categoryResponse.json();

    const discountsData = await fetchDiscounts();

    const categoryWithDiscounts = categoryData.map((book) => {
        const discountInfo = discountsData.find((discount) => discount.bookId === book.bookId);
        return { ...book, discount: discountInfo ? discountInfo.discountPercentage : 0 };
    });

    return categoryWithDiscounts;
}


// Полная информация о книгах
export async function fetchBookDetails(bookId) {
    const [bookResponse, authorResponse, discountsResponse, categoriesResponse, genresResponse] = await Promise.all([
        fetch(`api/books/GetBookById?bookId=${bookId}`),
        fetch(`api/books/GetAuthors?bookId=${bookId}`),
        fetch(`api/books/GetDiscountById?bookId=${bookId}`),
        fetch(`api/books/GetCategoryById?bookId=${bookId}`),
        fetch(`api/books/GetGenreById?bookId=${bookId}`)
    ]);

    const [bookData, authorData, discountData, categoryData, genreData] = await Promise.all([
        bookResponse.json().catch(error => {
            console.error("Error parsing book JSON:", error);
            return null;
        }),
        authorResponse.json().catch(error => {
            console.error("Error parsing author JSON:", error);
            return null;
        }),
        discountsResponse.json().catch(error => {
            console.error("Discounts JSON is null:", error);
            return null;
        }),
        categoriesResponse.json().catch(error => {
            console.error("Error parsing categories JSON:", error);
            return null;
        }),
        genresResponse.json().catch(error => {
            console.error("Error parsing genres JSON:", error);
        })
    ]);

    const bookWithDetails = {
        ...bookData,
        discount: discountData ? discountData.discountPercentage : null,
        author: authorData ? authorData[0].lastName + ' ' + authorData[0].firstName : null,
        category: categoryData
            ? categoryData.map((category, index) => (
                <React.Fragment key={category.categoryId}>
                    <a href={`category/${category.categoryId}`} key={category.categoryId}>
                        {category.name}
                    </a>
                </React.Fragment>
            ))
            : null,
        genre: genreData ? genreData.map((genre, index) => (
            <React.Fragment key={genre.genreId}>
                <a href={`genre/${genre.genreId}`} key={genre.genreId}>
                    {genre.name}
                </a>
            </React.Fragment>
        )) : null
    };

    return bookWithDetails;
}


