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

// Берем только информацию о скидках
export async function fetchDiscounts() {
    const discountsResponse = await fetch("api/books/GetDiscounts");
    const discountsData = await discountsResponse.json();

    return discountsData;
}

// Полная информация о книгах
export async function fetchBookDetails(bookId) {
    const [bookResponse, authorResponse, discountsResponse, categoriesResponse] = await Promise.all([
        fetch(`api/books/GetBookById?bookId=${bookId}`),
        fetch(`api/books/GetAuthors?bookId=${bookId}`),
        fetch(`api/books/GetDiscountById?bookId=${bookId}`),
        fetch(`api/books/GetCategoryById?bookId=${bookId}`)
    ]);

    const [bookData, authorData, discountData, categoryData] = await Promise.all([
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
        })
    ]);


    const bookWithDetails = {
        ...bookData,
        discount: discountData ? discountData.discountPercentage : null,
        author: authorData ? authorData[0].lastName + ' ' + authorData[0].firstName : null,
        category: categoryData
            ? categoryData.map((category, index) => (
               <>
                    {index > 0 && <span> > </span>}
                    <a href={`category/${category.categoryId}`} key={category.categoryId}>
                        {category.name}
                    </a>
                </>
            ))
            : null
    };

    return bookWithDetails;
}

