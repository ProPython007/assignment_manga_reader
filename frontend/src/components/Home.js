import { useState, useEffect } from "react";
import { baseURL } from "../constants/constants";
import useFetch from "../utils/useFetch";
import ChapterList from "./ChapterList"


const Home = () => {
    const {data: books, isPending, error} = useFetch(`${baseURL}/books/`);
    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        if (books && books.length > 0) {
            setCurrentBook(books[0]);
        }
    }, [books]);

    function isBookSelected(id) {
        if ((currentBook) && (currentBook.id === id)){
            return true;
        }
        return false;
    }

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {books && (
                <div className="book-titles">
                    {books.map((book) => (
                        <button 
                            className={
                                isBookSelected(book.id) ? "book-title currentBook" : "book-title"
                            }
                            onClick={() => {
                                setCurrentBook(book)
                            }}
                            key={book.id}>
                                {book.title}
                        </button>
                    ))}
                </div>
            )}
            <br />
            {currentBook && (<ChapterList book={currentBook} />)}
        </div>
    );
}
 
export default Home;