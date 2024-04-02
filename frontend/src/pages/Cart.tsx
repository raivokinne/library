import { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import CartList from "../components/CartItem";
import { Book } from "../types";

export default function Cart() {
    const [data, setData] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchCartItems() {
            setLoading(true);
            try {
                const response = await fetch(
                    "http://localhost:9090/cart/cart.php",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchCartItems();
    }, []);

    const returnBook = async (book: Book) => {
        const response = await fetch("http://localhost:9090/cart/cart.php", {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
                book_id: book.book_id,
                quantity: book.quantity,
            }),
        });
        await response.json();
        if (response.status === 200) {
            window.location.reload();
        }
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <Navbar />
            <section className="grid place-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-[8rem]">
                {loading ? (
                    <p>Loading...</p>
                ) : data.length > 0 ? (
                    <>
                        {data.map((book) => (
                            <div key={book.book_id}>
                                <CartList book={book} />
                                <button
                                    onClick={() => returnBook(book)}
                                    className="px-4 py-2 mt-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                                >
                                    Return
                                </button>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No books in cart</p>
                )}
            </section>
        </>
    );
}
