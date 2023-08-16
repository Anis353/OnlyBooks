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

export async function fetchDiscounts() {
    const discountsResponse = await fetch("api/books/GetDiscounts");
    const discountsData = await discountsResponse.json();

    return discountsData;
}

