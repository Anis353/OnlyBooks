import React, { useEffect, useState } from 'react';

export function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("api/books/GetBooks")
            .then(response => response.json())
            .then(responseJson => {
                setBooks(responseJson);
            })
    }, []);

    return (
        <div className="wrapper">
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>BookID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((item) => (
                                    <tr key={item.bookId}>
                                        <td>{item.bookId}</td>
                                        <td>{item.title}</td>
                                        <td>{item.authorId}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
