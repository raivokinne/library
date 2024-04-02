import { useEffect, useState } from "react";
import { Book } from "../types";
import { useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import useFetchUsers from "../hooks/useFetchUsers";

export default function ShowBook() {
    const { bookId } = useParams();
    const [book, setBook] = useState<Book>({} as Book);
    const [quantity, setQuantity] = useState(1);
    const [returnDate, setReturnDate] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() + 7);
        return today.toISOString().slice(0, 10);
    });
    const { data, error, loading } = useFetchUsers();

    useEffect(() => {
        async function fetchBook() {
            const response = await fetch(
                `http://localhost:9090/books/book.php?book_id=${bookId}`
            );
            const data = await response.json();
            setBook(data);
        }
        fetchBook();
    }, [bookId]);

    const addToCart = async () => {
        const response = await fetch("http://localhost:9090/cart/cart.php", {
            method: "POST",
            body: JSON.stringify({
                book_id: book.book_id,
                quantity: quantity,
                return_date: returnDate,
                availabe: book.availability,
            }),
            credentials: "include",
        });

        const data = await response.json();
        console.log(data);
    };

    const deleteBook = async () => {
        const response = await fetch("http://localhost:9090/books/books.php", {
            method: "DELETE",
            body: JSON.stringify({
                book_id: book.book_id,
                author_id: book.author_id,
            }),
            credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
            window.location.href = "/";
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <Navbar />
            <section className="grid h-screen grid-cols-2 place-items-center ">
                {book.image && (
                    <img
                        src={"http://localhost:9090/books/" + book.image}
                        alt={book.title}
                        className="object-cover w-[500px] rounded-lg"
                    />
                )}
                <article className="p-6 mb-10 w-[800px]">
                    <h2 className="mb-2 text-4xl font-bold text-gray-900">
                        {book.title}
                    </h2>
                    <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                        {book.name}
                    </h3>
                    <p className="mb-2 text-lg text-gray-700">
                        Publication Year: {book.publication_year}
                    </p>

                    <div>
                        <p className="mb-2 text-lg text-gray-700">
                            {book.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 space-x-4">
                        <label htmlFor="returnDate" className="flex flex-col">
                            <span className="text-lg font-bold text-gray-800">
                                Return Date
                            </span>
                            <input
                                type="date"
                                id="returnDate"
                                name="returnDate"
                                className="p-2 border border-gray-400 rounded-md"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                            />
                        </label>
                        <label htmlFor="quantity" className="flex flex-col">
                            <span className="text-lg font-bold text-gray-800">
                                Quantity
                            </span>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                className="p-2 border border-gray-400 rounded-md"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(parseInt(e.target.value))
                                }
                            />
                        </label>
                    </div>
                    <div className="flex justify-between mt-4 space-x-4">
                        <button
                            className="px-4 py-2 text-white bg-black rounded w-[200px]"
                            onClick={addToCart}
                        >
                            Add to Cart
                        </button>
                        {data.map(
                            (user) =>
                                user.is_admin === 1 && (
                                    <>
                                        <button
                                            className="px-4 py-2 text-white bg-black rounded w-[200px]"
                                            onClick={deleteBook}
                                        >
                                            Delete
                                        </button>
                                        <a
                                            className="px-4 py-2 text-white bg-black rounded w-[200px]"
                                            href={`/books/${book.book_id}/edit`}
                                        >
                                            Edit
                                        </a>
                                    </>
                                )
                        )}
                    </div>
                </article>
            </section>
        </>
    );
}
